from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import WaterStation, StationReading

router = APIRouter()


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
