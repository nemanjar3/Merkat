import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from .api.serializers.utils import CustomSerializer
from .models import Message, User


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            print(f"Scope: {self.scope}")
            print(f"Query string: {self.scope['query_string']}")
            print(f"URL route kwargs: {self.scope['url_route']['kwargs']}")

            current_user_id = self.scope['user'].id if self.scope['user'].id else int(self.scope['query_string'])
            other_user_id = self.scope['url_route']['kwargs']['id']
            self.room_name = (
                f'{current_user_id}_{other_user_id}'
                if int(current_user_id) > int(other_user_id)
                else f'{other_user_id}_{current_user_id}'
            )
            self.room_group_name = f'chat_{self.room_name}'
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            await self.accept()
            print(f"Connected to WebSocket: {self.room_group_name}")
        except Exception as e:
            print(f"Error during connection: {e}")
            await self.close()

    async def disconnect(self, close_code):
        try:
            await self.channel_layer.group_discard(self.room_group_name, self.channel_layer)
            await self.disconnect(close_code)
            print(f"Disconnected from WebSocket: {self.room_group_name} with code {close_code}")
        except Exception as e:
            print(f"Error during disconnection: {e}")

    async def receive(self, text_data=None, bytes_data=None):
        try:
            data = json.loads(text_data)
            message = data['message']
            sender_username = data['senderUsername'].replace('"', '')
            sender = await self.get_user(sender_username.replace('"', ''))

            await self.save_message(sender=sender, message=message, thread_name=self.room_group_name)

            messages = await self.get_messages()

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'senderUsername': sender_username,
                    'messages': messages,
                },
            )
            print(f"Received message: {text_data}")
        except Exception as e:
            print(f"Error during message receive: {e}")

    async def chat_message(self, event):
        try:
            message = event['message']
            username = event['senderUsername']
            messages = event['messages']

            await self.send(
                text_data=json.dumps(
                    {
                        'message': message,
                        'senderUsername': username,
                        'messages': messages,
                    }
                )
            )
            print(f"Sending message: {event['message']}")
        except Exception as e:
            print(f"Error during message send: {e}")

    @database_sync_to_async
    def get_user(self, username):
        try:
            return User.objects.filter(username=username).first()
        except Exception as e:
            print(f"Error getting user: {e}")
            return None

    @database_sync_to_async
    def get_messages(self):
        try:
            custom_serializers = CustomSerializer()
            messages = custom_serializers.serialize(
                Message.objects.select_related().filter(thread_name=self.room_group_name),
                fields=(
                    'sender__pk',
                    'sender__username',
                    'sender__last_name',
                    'sender__first_name',
                    'sender__email',
                    'sender__last_login',
                    'sender__is_staff',
                    'sender__is_active',
                    'sender__date_joined',
                    'sender__is_superuser',
                    'message',
                    'thread_name',
                    'timestamp',
                ),
            )
            return messages
        except Exception as e:
            print(f"Error getting messages: {e}")
            return []

    @database_sync_to_async
    def save_message(self, sender, message, thread_name):
        try:
            Message.objects.create(sender=sender, message=message, thread_name=thread_name)
        except Exception as e:
            print(f"Error saving message: {e}")