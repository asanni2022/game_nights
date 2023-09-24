from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.core.validators import *

# requires 'pip install django-localflavor'
# INSTALLED_APPS = (
    # ...
   # 'localflavor',
# )
# from localflavor.models import USStateField
def max_attending_event(event):
    event_obj = Event.objects.get(pk=event)
    current_attendance = EventUser.objects.filter(event=event_obj.id).count()
    if current_attendance >= event_obj.max_attendees:
        raise ValidationError('Event is currently full')
    else:
        return True

class AppUser(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=64,
        unique=True,
    )
    username=models.CharField(max_length=16, unique=True, verbose_name="Username")
    first_name=models.CharField(max_length=16, verbose_name="First name")
    last_name=models.CharField(max_length=16, verbose_name="Last name")

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"ID: {self.id}, Name: {self.first_name} {self.last_name}, username: {self.username}, email: {self.email}"

# do we want to use from localflavor.models import USStateField or just a 2-character CharField?
# do we also want to use localflavor.us.models.USZipCodeField?
# allow any other fields to be null/blank?

class Event(models.Model):
    owner=models.ForeignKey(AppUser, default=None, on_delete=models.CASCADE)
    name=models.CharField(max_length=32,blank=True, null=True, default=None, verbose_name="Name")
    code=models.CharField(max_length=8,blank=True, null=True, default=None, verbose_name="Code")
    category=models.CharField(max_length=16, verbose_name="Category")
    max_attendees=models.IntegerField(blank=True, null=True, default=None, verbose_name="Maximum attendees")
    private=models.BooleanField(default=False, blank=True, null=True, verbose_name="Private game") # or choice between 'public' and 'private'? 
    start_time=models.DateTimeField(blank=True, null=True, default=None, verbose_name="start date and time")
    end_time=models.DateTimeField(blank=True, null=True, default=None, verbose_name="end date and time")
    all_day=models.BooleanField(default=False, blank=True, null=True, verbose_name="All day")
    description=models.TextField(blank=True, null=True, default=None, verbose_name="desciption")
    chat_creation=models.BooleanField(default=False, blank=True, null=True, verbose_name="Chat Creation")
    games=models.JSONField(null=True, blank=True, default=None)
    address_1 = models.CharField(max_length=128, verbose_name="Address")
    address_2 = models.CharField( max_length=128, blank=True, null=True, default=None, verbose_name="Address cont'd")
    city = models.CharField(max_length=64, verbose_name="City")
    state = models.CharField(max_length=2, verbose_name="State")
    zip_code = models.CharField(max_length=5, verbose_name="Zip code")

    def __str__(self):
        return f"ID: {self.id}, Name: {self.name}, Category: {self.category}, Private: {self.private}"

# class Game(models.Model):
#     title=models.CharField(max_length=32, blank=False, unique=True, verbose_name="Title")
#     player_num=models.IntegerField(blank=True, null=True, default=None, verbose_name="Number of Players")
#     description=models.TextField(blank=True, null=True, default=None, verbose_name="Description")

#     def __str__(self):
#         return f"ID: {self.id}, Title: {self.title}"

# class EventGame(models.Model):
#     game=models.CharField(max_length=32, blank=False, unique=True, verbose_name="Game")
#     # game=models.ForeignKey(Game, on_delete=models.CASCADE, related_name='games') # through='Game'?
#     event=models.ForeignKey(Event, on_delete=models.CASCADE, related_name='eventgames') # through='Event'?

#     def __str__(self):
#         return f"ID: {self.id}, Game: {self.game}, Event: {self.event}"

# Not sure I interpreted the requirements for this model correctly?
class EventUser(models.Model):
    # owner=models.ForeignKey(AppUser, on_delete=models.CASCADE)
    attendee=models.ForeignKey(AppUser, on_delete = models.CASCADE, related_name="attendees")
    event=models.ForeignKey(Event, on_delete = models.CASCADE, related_name="events",validators=[max_attending_event])

    def __str__(self):
        return f"ID: {self.id}, Attendee: {self.attendee}"
    
    class Meta:
        unique_together = (('attendee', 'event'))

class Group(models.Model):
    name=models.CharField(max_length=32, blank=False,default=None, unique=True, verbose_name="Name")
    code=models.CharField(max_length=8, blank=False, default=None, unique=True, verbose_name="Code")
    # should really change related name to groups rather than members.
    member=models.ManyToManyField(AppUser, blank=True, related_name='members')
    
    def __str__(self):
        return f"ID: {self.id}, Name: {self.name}, Code: {self.code}"

# class GroupList(models.Model):
#     owner = models.OneToOneField(AppUser, default=None, on_delete = models.CASCADE, related_name='owner')
#     group = models.ManyToManyField(Group, blank=True, related_name='Listgroups')
#     # not sure how to create a __str__ for this?

class GroupRequest(models.Model):
    sender = models.ForeignKey(AppUser, on_delete = models.CASCADE, related_name='Groupsender')
    receiver = models.ForeignKey(AppUser, on_delete = models.CASCADE, related_name='Groupreceiver')
    # is_active = models.BooleanField(blank=True, default=True)
    group=models.ForeignKey(Group, default=None, on_delete = models.CASCADE, related_name='Requestgroups')
    
    def __str__(self):
        return f"ID: {self.id}, Group: {self.group}, Sender: {self.sender}, Receiver: {self.receiver}"

    # class Meta:
    #     unique_together = (('sender', 'receiver'))

class EventRequest(models.Model):
    sender = models.ForeignKey(AppUser, on_delete = models.CASCADE, related_name='Eventsender')
    receiver = models.ForeignKey(AppUser, on_delete = models.CASCADE, related_name='Eventreceiver')
    event=models.ForeignKey(Event, on_delete = models.CASCADE, related_name='event')

    def __str__(self):
        return f"ID: {self.id}, Event: {self.event}, Sender: {self.sender}, Receiver: {self.receiver}"
