from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import get_db
from models import WaterStation, StationReading, Alert, Report

router = APIRouter()

@router.get("/dashboard-data")
def get_dashboard_data(db: Session = Depends(get_db)):

    total_waterstations = db.query(WaterStation).count()
    total_readings = db.query(StationReading).count()
    total_reports = db.query(Report).count()
    total_alerts = db.query(Alert).count()

    avg_readings_per_station = (
        total_readings / total_waterstations
        if total_waterstations > 0 else 0
    )

    avg_reports_per_station = (
        total_reports / total_waterstations
        if total_waterstations > 0 else 0
    )

    report_status_count = dict(
        db.query(Report.status, func.count(Report.id))
        .group_by(Report.status)
        .all()
    )

    parameter_data = (
        db.query(
            StationReading.parameter,
            func.min(StationReading.value),
            func.max(StationReading.value),
            func.avg(StationReading.value),
        )
        .group_by(StationReading.parameter)
        .all()
    )

    box_data = [
        {
            "parameter": p[0],
            "min": float(p[1]),
            "max": float(p[2]),
            "avg": round(float(p[3]), 2),
        }
        for p in parameter_data
    ]

    latest_alerts = [
        {
            "id": a.id,
            "message": a.message,
        }
        for a in db.query(Alert)
        .order_by(Alert.created_at.desc())
        .limit(3)
        .all()
    ]

    latest_reports = [
        {
            "id": r.id,
            "description": r.description,
            "status": r.status,
        }
        for r in db.query(Report)
        .order_by(Report.created_at.desc())
        .limit(3)
        .all()
    ]

    return {
        "tws": total_waterstations,
        "trc": total_readings,
        "arps": round(avg_readings_per_station, 2),
        "areps": round(avg_reports_per_station, 2),
        "asc": {"total_alerts": total_alerts},
        "rsc": report_status_count,
        "box_data": box_data,
        "latest_alerts": latest_alerts,
        "latest_reports": latest_reports,
    }