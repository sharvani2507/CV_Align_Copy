import random
import string

def generate_unique_code(length: int = 8) -> str:
    """Generate a random unique code for company registration."""
    characters = string.ascii_letters + string.digits
    return ''.join(random.choices(characters, k=length))
