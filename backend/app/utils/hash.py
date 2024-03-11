import bcrypt


def hash_password(password: str) -> bytes:
    """
    Hashes a password.

    :param password: The password to hash.
    :return: The hashed password.
    """
    return bcrypt.hashpw(password.encode("utf-8"), salt=bcrypt.gensalt())


def verify_password(password: str, hashed_password: bytes) -> bool:
    """
    Verify a password against a hashed password.

    :param password: The plaintext password.
    :param hashed_password: The hashed password.
    :return: True if passwords match, False otherwise.
    """
    return bcrypt.checkpw(password.encode("utf-8"), hashed_password)
