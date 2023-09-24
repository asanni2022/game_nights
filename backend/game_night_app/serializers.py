from rest_framework import serializers
from game_night_app.models import Event

class EventSerializer(serializers.ModelSerializer):
    peeps = serializers.CharField()
    class Meta:
        model = Event
        fields = ('name','peeps')

# class EventListSerializer(serializers.ModelSerializer):
#     events = EventSerializer(many=True)
#     class Meta:
#         model= Event
#         fields = '__all__'