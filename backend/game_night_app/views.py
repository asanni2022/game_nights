from audioop import add
from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from .serializers import EventSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
 # pip install stream-chat
import stream_chat
import json
import random
import requests
import os
from dotenv import load_dotenv
from .models import AppUser, Event, EventRequest, EventUser, Group, GroupRequest
from django.forms.models import model_to_dict
from django.contrib.auth.decorators import login_required
from itertools import chain, count
from django.db.models import Count, Case, When, IntegerField, Subquery,OuterRef




load_dotenv()



# Create your views here.
def send_the_homepage(request):
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

@api_view(['GET'])
def create_chat_user_token(request):
    try:
        user_email= request.user.email
        user = AppUser.objects.get(email = user_email)
        # user_id= str(user.id)
        user_id= str(user.username)
        # print('IN TOKEN ON DJANGO, user', user, 'user_id', user_id, 'type user id', type(user_id))
        server_client = stream_chat.StreamChat(api_key=os.environ['chatapikey'], api_secret=os.environ['secretchatkey'])
        token = server_client.create_token(user_id)
        # print('IN CREATE CHAT USER TOKEN, TOKEN IS', token)
        return JsonResponse({'succes':'true', 'token': token})
    except Exception as e:
        return JsonResponse({'success': "false", 'reason': f'failed to create token, {str(e)}'})

@api_view(['GET'])
def stream_api(request):
    api=os.environ['stream_key']
    # print('IN STREAM API REQUEST', api, 'type', type(api))
    try:
        return JsonResponse({'succes':'true', 'api': api})
    except Exception as e:
        return JsonResponse({'success': "false", 'reason': f'failed to send key, {str(e)}'})

    
@api_view(['POST'])
def create_group_request(request):
    print('YOU ARE IN THE PUT REQUEST ON DJANGO FOR CREATE GROUP REQUESTS')
    user_email = request.user.email
    friend_email = request.data['friend_email']
    code = request.data['group_code']
    print('USER EMAIL', user_email, 'FRIEND EMAIL', friend_email, 'code', code)
    # could send multiple emails at once and grab from frontend if we wanted and create a request for each person in the array
    user = AppUser.objects.get(email = user_email)
    friend = AppUser.objects.get(email = friend_email)
    group = Group.objects.get(code = code)
    if group:
        print('in create group invite under "if group:')
        if friend:
            print('in create group invite under "if friend:')
            try:
                print('in the create group request try')
                group_request = GroupRequest(sender = user, receiver = friend, group = group)
                group_request.full_clean
                group_request.save()
                print('YOUR NEW GROUP REQUEST IS', group_request)
                return JsonResponse({'success': "True", 'action':'group request created in db'})
            except Exception as e:
                return JsonResponse({'success': "False", 'reason': f'something went wrong, {str(e)}'})
        else:
            print('inside the else on create group invite')
            return JsonResponse({'success': "False", 'reason': 'friends account doesnt exist'})
    else:
        return JsonResponse({'success': "False", 'reason': 'group doesnt exist'})

@api_view(['GET'])
def view_group_request(request):
    print('YOU ARE IN THE GET REQUEST ON DJANGO FOR VIEW GROUP REQUESTS')
    user_email = request.user.email
    user = AppUser.objects.get(email = user_email)
    # view any requests sent to the user
    group_requests = GroupRequest.objects.filter(receiver= user)
    if group_requests:
        list_of_group_requests=[]
        for item in group_requests:
            #sends back the emails of all pending group requests
            sender = item.sender
            group = item.group 
            list_of_group_requests.append([sender.email, group.name, group.code])
        print('list of group_requests:', list_of_group_requests)
        try:
            return JsonResponse({'success': "True", 'group_requests': list_of_group_requests})
        except Exception as e:
            return JsonResponse({'success': "False", 'reason': f'something went wrong, {str(e)}'})
    else:
        return JsonResponse({'success': "False", 'reason': "you don't have any group requests"})

@api_view(['POST'])
def create_event_request(request):
    print('YOU ARE IN THE POST REQUEST ON DJANGO FOR CREATE EVENT REQUESTS')
    owner_id = request.data['owner_id']
    friend_email = request.data['friend_email']
    # could give the user the option to invite an entire group or send to specific individuals - the rest of the code assumes an individual, but I would think group invite would be nice as well.
    # would need if we do group invite:::: group_code = request.data['group_code']
    event_id = request.data['event_id']
    # print('USER EMAIL', user_email, 'FRIEND EMAIL', friend_email, 'event code', event_code)
    user = AppUser.objects.get(id = owner_id)
    friend = AppUser.objects.get(email = friend_email)
    event = Event.objects.get(id = event_id)
    if event is not None:
        if friend is not None:
            try:
                event_request = EventRequest(sender = user, receiver = friend, event = event)
                event_request.full_clean
                event_request.save()
                print('YOUR NEW EVENT REQUEST IS', event_request)
                return JsonResponse({'success': "True", 'action':'event request created in db'})
            except Exception as e:
                print(str(e))
                return JsonResponse({'success': "False", 'reason': f'something went wrong, {str(e)}'})
        else:
            return JsonResponse({'success': "False", 'reason': 'friends account doesnt exist'})
    else:
        return JsonResponse({'success': "False", 'reason': 'event doesnt exist'})

@api_view(['GET'])
def view_event_request(request):
    print('YOU ARE IN THE GET REQUEST ON DJANGO FOR VIEW EVENT REQUESTS')
    user_email = request.user.email
    user = AppUser.objects.get(email = user_email)
    # view any requests sent to the user
    event_requests = EventRequest.objects.filter(receiver= user)
    if event_requests:
        list_of_event_requests=[]
        for item in event_requests:
            #sends back the emails of all pending event requests
            sender = item.sender
            event = item.event
            list_of_event_requests.append([event.name, event.code, event.description, item.id])
        print('list of event_requests:', list_of_event_requests)
        try:
            return JsonResponse({'success': "True", 'event_requests': list_of_event_requests})
        except Exception as e:
            return JsonResponse({'success': "False", 'reason': f'something went wrong, {str(e)}'})
    else:
        return JsonResponse({'success': "False", 'reason': "you don't have any group requests"})

@api_view(['POST'])
def log_out(request):
    logout(request)
    print('USER IS LOGGED OUT')
    return JsonResponse({'user logged out': True})

@api_view(['PUT'])
def log_in(request):
    username= request.data['username']
    password = request.data['password']
    user = authenticate(username=username, password=password)
    print('user is', user)
    if user is not None:
        if user.is_active:
            try:
                login(request._request, user)
                print(f"{username} IS LOGGED IN!!!!!!!!!")
                return JsonResponse({'success': "True", 'action': 'user logged in'}) 
            except Exception as e:
                return JsonResponse({'success': "False", 'reason': f'failed to login, {str(e)}'})
        else:
            return JsonResponse({'success': "False", 'reason': 'This account has been disabled, please sign-up again'})
    else:
        return JsonResponse({'success': "False", 'reason': "This account doesn't exist, please sign-up"})    


@api_view(['GET'])
def bga_games(request, game):
    print('this is the game name:', game)
    api_id = str(os.getenv('GM_CLIENT_ID'))
    # name = request.query_params['name']
    url = 'https://api.boardgameatlas.com/api/search?'
    payload = {
        'client_id': api_id,
        'name': game,
        'exact': True,
        'limit': 2,
        'fields': 'name,price,url,description_preview,players,playtime,thumb_url,description'

    }
    raw_response = requests.get(url, params=payload)
    json_response = raw_response.json()
    return JsonResponse(json_response)




@api_view(['POST'])
def sign_up(request):
    print('IN DJANGO SIGN UP, REQUEST.DATA IS', request.data)
    user_email=request.data['email']
    username = request.data['username']
    password = request.data['password']
    first_name = request.data['firstname']
    last_name = request.data['lastname']
    print('IN DJANGO SIGN UP', user_email, username, first_name, last_name)
    try:
        all_users = AppUser.objects.all()
        all_user_emails=[]
        for user in all_users:
            all_user_emails.append(user.email)
        if user_email in all_user_emails:
            return JsonResponse({'success': "False", 'reason': 'This email already exists, please log-in'})
        else:
            # https://docs.djangoproject.com/en/4.1/ref/contrib/auth/
            newUser = AppUser.objects.create_user(username=username, password=password, email=user_email, last_name= last_name, first_name=first_name)
            newUser.full_clean
            newUser.save()
            print('new user is', newUser)
            return JsonResponse({'success': "True", 'action': 'user signed up'})
    except Exception as e:
        return JsonResponse({'success': "False", 'reason': str(e)})

@api_view(['GET', 'PUT', 'DELETE'])
def whoami(request):
    print('WHO AM I RAN')
    if request.user.is_authenticated:
        print('user authenticated')
        if request.method == "PUT":
            print('WHO AM I PUT REQUEST RAN')
            body = json.loads(request.body)
            request.user.email = body['email']
            request.user.username = body['username']
            if body['first_name'] and body['last_name']:
                request.user.first_name = body['first_name']
                request.user.last_name = body['last_name']
            request.user.save()
            return JsonResponse({'updated user info': True})
        elif request.method == 'DELETE':
            request.user.delete()
            return JsonResponse({'deleted user': True})
        else:
            data = serializers.serialize("json", [request.user], fields=['email', 'username', 'first_name', 'last_name'])
            return HttpResponse(data)
    else:
        return JsonResponse({'user': False})

@login_required
@api_view(['GET'])
def group_code(request):
    all_groups = Group.objects.all()
    all_codes = []
    for group in all_groups:
        all_codes.append(group.code)
    code = str(random.randint(10001,99999999))
    while code in all_codes:
        code = str(random.randint(10001,99999999))
    return JsonResponse({'success': 'True', 'group_code': code})

@login_required
@api_view(['POST'])
def create_group(request):
    new_group_name=request.data['name']
    code = request.data['code']
    user = AppUser.objects.get(email = request.user.email)
    print('user here in create group', user)
    try:
        new_group = Group(name = new_group_name, code = code)
        # I tried to have member = user in line above and got this error "'Direct assignment to the forward side of a many-to-many set is prohibited. Use member.set() instead.'"
        new_group.full_clean()
        new_group.save()
        # print('new group is', new_group)
        new_group.member.add(user)
        new_group.save()
        return JsonResponse({'success': "True", 'action': "group created"})
    except Exception as e:
        return JsonResponse({'success': "False", 'reason': str(e)})


@login_required
@api_view(['PUT'])
# accepts a group request then deletes it
def join_group(request):
    user = AppUser.objects.get(email = request.user.email)
    friend= AppUser.objects.get(email = request.data['friend_email'])
    code = request.data['code']
    all_groups = Group.objects.all()
    all_codes = []
    for group in all_groups:
        all_codes.append(group.code)
    if code in all_codes:
        if friend != None:
            try:
                group = Group.objects.get(code= code)
                group.member.add(user)
                print('group members are', group.member.all())
                group_request = GroupRequest.objects.get(sender = friend, receiver = user, group = group)
                group_request.delete()
                print('group request should now be deleted', group_request)
                return JsonResponse({'success': "True", 'action': "group created"})
            except Exception as e:
                return JsonResponse({'success': "False", 'reason': str(e)})
        else:
            return JsonResponse({'success': False, 'reason': 'friends account no longer exists'})
    else:
        return JsonResponse({'success': "False", 'reason': 'this group code doesnt exist'})

@login_required
@api_view(['PUT'])
# deletes a group invite
def decline_group(request):
    user = AppUser.objects.get(email = request.user.email)
    friend_list= AppUser.objects.filter(email = request.data['friend_email'])
    code = request.data['code']
    try:
        group = Group.objects.get(code= code)
        for friend in friend_list:
            group_request = GroupRequest.objects.get(sender = friend, receiver = user, group = group)
            group_request.delete()
            print('group request should now be deleted', group_request)
        return JsonResponse({'success': "True", 'action': "group invite declined"})
    except Exception as e:
        return JsonResponse({'success': "False", 'reason': str(e)}) 

@login_required
@api_view(['GET'])
def view_groups(request):
    user = AppUser.objects.get(email = request.user.email)
    # groups = Group.objects.filter(member = user)
    user_id = user.id
    groups = user.members.all()
    if len(groups)>0:
        list_of_groups=[]
        for group in groups:
            all_members=group.member.all()
            other_members=[]
            for member in all_members:
                if member.id != user_id:
                    other_members.append(member.username)
            list_of_groups.append([group.name, group.code, other_members])
        # print('line 364 list of groups', list_of_groups)
        try:
            return JsonResponse({'success': 'True', 'groups': list_of_groups})
        except Exception as e:
            return JsonResponse({'success': "False", 'reason': str(e)})
    else:
        return JsonResponse({'success': "False", 'reason': "you don't have any groups"})

@login_required
@api_view(['PUT'])
def leave_group(request):
    user = AppUser.objects.get(email = request.user.email)
    group_code = request.data['code']
    group = Group.objects.get(code=group_code)
    print('users groups before delete', user.members.all())
    try:
        user.members.remove(group)
        print(f'user should no longer be in group --group {group.id} should now be deleted', user.members.all)
        group_members = group.member.all()
        if not group_members:
            group.delete()
            print('group should be deleted', group)
            return JsonResponse({'success': 'True', 'action': 'user left group', 'group_deleted':'True'})
        else:
            return JsonResponse({'success': 'True', 'action': 'user left group', 'group_deleted':'False'})
    except Exception as e:
        return JsonResponse({'success': "False", 'reason': str(e)})




@api_view(['POST'])   
def create_event(request):  
    # print('IN DJANGO EVENT CREATION, REQUEST.DATA IS', request.data)
    all_events = Event.objects.all()
    all_codes = []
    for event in all_events:
        all_codes.append(event.code)
    code = str(random.randint(10000001,99999999))
    while code in all_codes:
        code = str(random.randint(10000001,99999999))
    name = request.data['event_name']
    # code = str(random.randint(10001, 99999999))
    category = request.data['category']
    games = request.data['games']
    private = request.data['private']
    max_attendees = request.data['attendees']
    chat_creation = request.data['chatcreation']
    all_day = request.data['allDay']
    start_time = request.data['eventStart']
    end_time = request.data['eventEnd']
    description = request.data['description']
    address_1 = request.data['addressLine1']
    address_2 = request.data['addressLine2']
    city = request.data['city']
    state = request.data['state']
    zip_code = request.data['zip']
    user = AppUser.objects.get(email = request.user.email)
    try:
        new_event = Event(owner=user, code=code, address_1=address_1, address_2=address_2, city=city, state=state, zip_code=zip_code, name=name, category=category, max_attendees=max_attendees, games=games, private=private, chat_creation=chat_creation, all_day=all_day, start_time=start_time, end_time=end_time, description=description)
        new_event.full_clean()
        new_event.save()
        owner_attending = EventUser(attendee = user, event = new_event)
        owner_attending.full_clean()
        owner_attending.save()
        print('NEW EVENT ADDED', new_event)
        return JsonResponse({'added event': "True", 'eventName': new_event.name, 'eventCode': new_event.code})
    except Exception as e:
        return JsonResponse({'success': "false", 'reason': f'failed to create event: {str(e)}'})


@api_view(['GET'])
def userevents(request):
    if request.user.is_authenticated:
        all_events_attending = EventUser.objects.filter(attendee=request.user.id)
        attending_ids = all_events_attending.values_list('event', flat='True')
        events_user = AppUser.objects.filter(event=OuterRef('pk'))
        events_attending = Event.objects.filter(id__in=attending_ids).annotate(peeps=Count('events')).annotate(owner_true =Count(Case(When(owner=request.user.id, then=1),output_field=IntegerField()))).annotate(username=Subquery(events_user.values('username')))         
        data = events_attending.values()
        return Response(data)
    else:
        return JsonResponse({'user': False})

@api_view(['GET', 'PUT'])
def userevents_byid(request,id):
    if request.user.is_authenticated:
        if request.method =='GET':
            code = str(id)
            if len(code) < 8:
                code = code.rjust(8,'0')
            # removed the check that only lets you get events you own
            events_user = AppUser.objects.filter(event=OuterRef('pk'))
            events = Event.objects.filter(code=code).annotate(peeps=Count('events')).annotate(owner_true =Count(Case(When(owner=request.user.id, then=1),output_field=IntegerField()))).annotate(username=Subquery(events_user.values('username'))) 
            # data = serializers.serialize('json',events)
            data = events.values()
            return Response(data)
        elif request.method == 'PUT':
            body = json.loads(request.body)
            code = str(id)
            event = Event.objects.get(code = code)
            event.name = body['name']
            event.description = body['description']
            event.games = body['games']
            event.address_1 = body['address_1']
            event.address_2 = body['address_2']
            event.city = body['city']
            event.state = body['state']
            event.zip_code = body['zip_code']
            event.max_attendees = body['max_attendees']
            event.private = body['private']
            event.start_time = body['start_time']
            event.end_time = body['end_time']
            event.save()
            return JsonResponse({'event updated': True})
    else:
        return JsonResponse({'user': False})
    
@login_required    
@api_view(['GET'])
def group_details(request, id):
    if request.user.is_authenticated:
        code = str(id)
        group = Group.objects.get(code=code)
        group_list = []
        member_names = []
        all_members=group.member.all()
        for member in all_members:
            member_names.append(member.username)
        group_list.append([group.name, group.code, member_names])
        try:
            return JsonResponse({'success': 'True', 'group_info': group_list})
        except Exception as e:
            return JsonResponse({'success': "False", 'reason': str(e)})
    else:
        return JsonResponse({'user': False})

@api_view(['GET'])
def allevents(request):
    try:
        events = Event.objects.all()
        data = serializers.serialize('json', events)
        # print(data)
        return HttpResponse(data, content_type='application/json')
    except:
        return Response('error fetching events')

@api_view(['POST'])
def join_event(request,id):
    try:
        code = str(id)
        if len(code) < 8:
            code = code.rjust(8,'0') 
        event = Event.objects.get(code=code)
        user = AppUser.objects.get(pk = request.user.id)
        event_requests = EventRequest.objects.filter(receiver= user)
        for item in event_requests:
            if(item.event.code == event.code):
                try:
                    item.delete()
                except Exception as err:
                    return JsonResponse({'delete invite': False, 'reason': str(err)})
        add_attending = EventUser(event = event, attendee=user)
        add_attending.full_clean()
        add_attending.save()
        return Response('joined!')
    except Exception as err:
        return JsonResponse({'success': "false", 'reason': f'failed to join event: {str(err)}'})

@api_view(['DELETE'])
def decline_event(request, id):
    try:
        invite = EventRequest.objects.all().get(id=id)
        invite.delete()
        return JsonResponse({'deleted': True})
    except Exception as err:
        return JsonResponse({'deleted': False, 'reason': str(err)})

@login_required
@api_view(['PUT'])
def delete_event(request):
    event_id = request.data['id']
    event = Event.objects.get(id = event_id)
    print('in delete event, event is', event)
    try:
        event.delete()
        # does this delete event requests also? and event users?
        print('event should now be deleted', event)
        return JsonResponse({'deleted event': 'True'})
    except Exception as e:
        return JsonResponse({'success': "false", 'reason': f'failed to delete event: {str(e)}'})

@login_required
@api_view(['PUT'])
def leave_event(request):
    user = AppUser.objects.get(email = request.user.email)
    event_id = request.data['id']
    event = Event.objects.get(id = event_id)
    event_user = EventUser.objects.get(attendee= user, event = event)
    print('in leave event, event user is', event_user)
    try:
        event_user.delete()
        print('event user should now be deleted', event_user)
        return JsonResponse({'left event': 'True'})
    except Exception as e:
        return JsonResponse({'success': "false", 'reason': f'failed to leave event: {str(e)}'})

@api_view(['GET'])
def am_attending(request,id):
    code = str(id)
    if len(code) < 8:
        code = code.rjust(8,'0')
    eventt = Event.objects.get(code=code)
    user_obj = AppUser.objects.get(pk=request.user.id)
    test = EventUser.objects.filter(attendee=user_obj, event=eventt)
    if test:
        return Response(True)
    else:
        return Response(False)

@login_required
@api_view(['PUT'])
def new_password(request):
    if request.user.is_authenticated:    
        if request.method == "PUT":
            try:
                body = json.loads(request.body)
                request.user.set_password(body['new_password'])
                request.user.save()
                update_session_auth_hash(request, request.user)
                return JsonResponse({'success': True})
            except Exception as e:
                return JsonResponse({'success': False, 'reason': str(e)})

# Alisha comments:

# source ~/VEnvirons/GameNight/bin/activate
# pip install -r requirements.txt
# http://127.0.0.1:8000/
