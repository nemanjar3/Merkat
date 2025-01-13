"""
ASGI config for merkat project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
import merkatapp.routing


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'merkat.settings')

django_asgi_app = get_asgi_application()
import merkatapp.routing


application = ProtocolTypeRouter({
    'http':django_asgi_app,
    'websocket':AuthMiddlewareStack(
        URLRouter(
            merkatapp.routing.websocket_urlpatterns
        )
    )
})
