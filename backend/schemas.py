from pydantic import BaseModel, EmailStr
from enum import Enum
from typing import Optional
from datetime import datetime


class UserRole(str, Enum):
    citizen = "citizen"
    ngo = "ngo"
    authority = "authority"
    admin = "admin"


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: UserRole = UserRole.citizen


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: UserRole
    created_at: datetime

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ReportStatus(str, Enum):
    pending = "pending"
    verified = "verified"
    rejected = "rejected"


class ReportCreate(BaseModel):
    location: str
    description: str
    water_source: str
    photo_url: Optional[str] = None
    alert_id: Optional[int] = None


class ReportResponse(BaseModel):
    id: int
    user_id: int
    alert_id: Optional[int]
    location: str
    description: str
    water_source: str
    photo_url: Optional[str]
    status: ReportStatus
    created_at: datetime

    class Config:
        from_attributes = True


class StationCreate(BaseModel):
    name: str
    location: str
    latitude: str
    longitude: str
    managed_by: Optional[str] = None


class StationResponse(BaseModel):
    id: int
    name: str
    location: str
    latitude: str
    longitude: str
    managed_by: Optional[str]

    class Config:
        from_attributes = True


class StationReadingCreate(BaseModel):
    parameter: str
    value: float


class StationReadingResponse(BaseModel):
    id: int
    station_id: int
    parameter: str
    value: float
    recorded_at: datetime

    class Config:
        from_attributes = True


class AlertResponse(BaseModel):
    id: int
    station_id: int
    parameter: str
    value: float
    threshold: float
    message: str
    created_at: datetime

    class Config:
        from_attributes = True
