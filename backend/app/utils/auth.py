import os
from datetime import datetime, timedelta

import jwt
from dotenv import load_dotenv
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext


# https://youtu.be/xZnOoO3ImSY?si=PSMb6FIW5YB39Dra
class AuthHandler:
    """Class to handle authentication."""

    security = HTTPBearer()

    def __init__(self):
        """Constructor."""
        load_dotenv()
        self.secret_key = os.environ.get("BACKEND_SECRET_KEY", "secret_12340987")
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        self.algorithm = os.environ.get("ALGORITHM", "HS256")
        self.token_expiry_time_minutes = int(
            os.environ.get("TOKEN_EXPIRY_TIME_MINUTES", 15)
        )

    def get_password_hash(self, password: str) -> str:
        """Returns hashed password."""
        return self.pwd_context.hash(password)

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verifies password."""
        return self.pwd_context.verify(plain_password, hashed_password)

    def encode_token(self, user_id: str) -> str:
        """Encodes JWT token."""
        payload = {
            "exp": datetime.utcnow()
            + timedelta(minutes=self.token_expiry_time_minutes),
            "iat": datetime.utcnow(),
            "sub": user_id,
        }
        return jwt.encode(payload, self.secret_key, self.algorithm)

    def decode_token(self, token: str) -> str:
        """Decodes JWT token into user_id."""
        try:
            payload = jwt.decode(token, self.secret_key, self.algorithm)
            return payload["sub"]
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Signature has expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")

    def auth_wrapper(
        self, auth: HTTPAuthorizationCredentials = Security(security)
    ) -> str:
        """Wrapper function to authenticate user."""
        return self.decode_token(auth.credentials)


# singleton
AUTH = AuthHandler()


def get_auth_handler() -> AuthHandler:
    """Returns the AUTH singleton."""
    return AUTH
