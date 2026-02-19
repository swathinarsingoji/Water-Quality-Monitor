
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone

from database import get_db
from models import WaterStation, StationReading, Alert, UserRole
from schemas import (
    StationCreate,
    StationResponse,
    StationReadingCreate,
    StationReadingResponse,
)
from routers.dependencies import require_roles, get_current_user

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import WaterStation, StationReading


router = APIRouter()



@router.get("/", response_model=list[StationResponse])
def get_stations(
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return db.query(WaterStation).all()


@router.post("/", response_model=StationResponse, status_code=201)
def create_station(
    station: StationCreate,
    db: Session = Depends(get_db),
    user=Depends(require_roles([UserRole.admin])),
):
    new_station = WaterStation(
        name=station.name,
        location=station.location,
        latitude=station.latitude,
        longitude=station.longitude,
        managed_by=station.managed_by,
    )

    db.add(new_station)
    db.commit()
    db.refresh(new_station)

    return new_station


@router.post("/{station_id}/readings", status_code=201)
def add_station_reading(
    station_id: int,
    reading: StationReadingCreate,
    db: Session = Depends(get_db),
    user=Depends(require_roles([UserRole.admin])),
):
    station = db.query(WaterStation).filter(
        WaterStation.id == station_id
    ).first()

    if not station:
        raise HTTPException(status_code=404, detail="Station not found")

    new_reading = StationReading(
        station_id=station_id,
        parameter=reading.parameter,
        value=reading.value,
    )

    db.add(new_reading)
    db.commit()
    db.refresh(new_reading)

    thresholds = {
        "pH": 8.5,
        "turbidity": 5,
        "DO": 6,
    }

    threshold = thresholds.get(reading.parameter)

    if threshold and reading.value > threshold:

        one_hour_ago = datetime.now(timezone.utc) - timedelta(hours=1)

        existing_alert = db.query(Alert).filter(
            Alert.station_id == station_id,
            Alert.parameter == reading.parameter,
            Alert.created_at >= one_hour_ago,
        ).first()

        if not existing_alert:
            alert = Alert(
                station_id=station_id,
                parameter=reading.parameter,
                value=reading.value,
                threshold=threshold,
                message=f"{reading.parameter} exceeded threshold",
            )
            db.add(alert)
            db.commit()

    return {"message": "Reading added successfully"}


@router.get("/{station_id}/readings", response_model=list[StationReadingResponse])
def get_station_readings(
    station_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return (
        db.query(StationReading)
        .filter(StationReading.station_id == station_id)
        .order_by(StationReading.recorded_at.asc())
        .all()
    )

@router.get("/")
def get_stations(db: Session = Depends(get_db)):
    return db.query(WaterStation).all()


@router.post("/", status_code=201)
def create_station(station: dict, db: Session = Depends(get_db)):
    new_station = WaterStation(
        name=station["name"],
        location=station["location"],
        latitude=station["latitude"],
        longitude=station["longitude"],
        managed_by=station.get("managed_by"),
    )
    db.add(new_station)
    db.commit()
    db.refresh(new_station)
    return new_station


@router.get("/{station_id}/readings")
def get_station_readings(station_id: int, db: Session = Depends(get_db)):
    return db.query(StationReading).filter(
        StationReading.station_id == station_id
    ).all()

