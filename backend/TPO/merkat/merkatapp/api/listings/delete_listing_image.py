import os
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from ...models import Image

class DeleteListingImageView(APIView):
    @swagger_auto_schema(
        operation_summary="Delete a listing image",
        operation_description="Moras poslati ovakav URL (NEMA MEDIA NA POCETKU!), '/listings_images/image_name.jpg'",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'image_url': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description="Moras poslati ovakav URL (NEMA MEDIA NA POCETKU!), '/listings_images/image_name.jpg'"
                ),
            },
            required=['image_url'],
        ),
        responses={
            200: openapi.Response(
                description="Image deleted successfully.",
                examples={"application/json": {"message": "Image deleted successfully."}},
            ),
            400: openapi.Response(
                description="Invalid input.",
                examples={"application/json": {"error": "Image URL is required."}},
            ),
            404: openapi.Response(
                description="Image not found.",
                examples={"application/json": {"error": "Image not found in the database."}},
            ),
            500: openapi.Response(
                description="Internal server error.",
                examples={"application/json": {"error": "An error occurred: <details>"}},
            ),
        }
    )
    def post(self, request, *args, **kwargs):
        image_url = request.data.get('image_url')

        if not image_url:
            return Response({'error': 'Image URL is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Normalize the input URL by stripping the MEDIA_URL prefix if it exists
            relative_path = image_url.lstrip('/')
            if relative_path.startswith(settings.MEDIA_URL.lstrip('/')):
                relative_path = relative_path[len(settings.MEDIA_URL.lstrip('/')):]

            # Get the image object from the database
            image = Image.objects.get(image=relative_path)

            # Construct the absolute path to the file
            image_path = os.path.join(settings.MEDIA_ROOT, image.image.name)

            # Delete the image object from the database
            image.delete()

            # Delete the file from the filesystem
            if os.path.exists(image_path):
                os.remove(image_path)

            return Response({'message': 'Image deleted successfully.'}, status=status.HTTP_200_OK)

        except Image.DoesNotExist:
            return Response(
                {
                    'error': 'Image not found in the database.',
                    'received_url': image_url,
                    'resolved_path': os.path.join(settings.MEDIA_ROOT, relative_path)
                },
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {
                    'error': f'An error occurred: {str(e)}',
                    'received_url': image_url,
                    'resolved_path': os.path.join(settings.MEDIA_ROOT, relative_path)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
