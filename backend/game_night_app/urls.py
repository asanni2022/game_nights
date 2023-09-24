from django.urls import path
from . import views

urlpatterns = [
    path('', views.send_the_homepage),
    path('chattoken', views.create_chat_user_token),
    path('group/create', views.create_group),
    path('group/join', views.join_group),
    path('group/leave', views.leave_group),
    path('group/decline', views.decline_group),
    path('groups/view', views.view_groups),
    path('group/code', views.group_code),
    path('group/request/create', views.create_group_request),
    path('group/request/view', views.view_group_request),
    path('eventrequest/create', views.create_event_request),
    path('eventrequest/view', views.view_event_request),
    path('logout', views.log_out),
    path('login', views.log_in),
    path('signup', views.sign_up),
    path('whoami', views.whoami),
    path('games/<str:game>', views.bga_games),
    # all events in the database
    path('events', views.allevents),
    # gives all events for a specific user, has necessary information for calendar (all information)
    path('userevents', views.userevents),
    # gives information for one specific event based on event code
    path('userevents/<int:id>', views.userevents_byid),
    # group details
    path('groups/<int:id>', views.group_details),
    path('streamapi', views.stream_api),
    path('events/create', views.create_event),
    path('event/delete', views.delete_event),
    path('event/join/<int:id>', views.join_event),
    path('event/decline/<int:id>', views.decline_event),
    path('amattending/<int:id>', views.am_attending),
    path('event/leave', views.leave_event),
    path('new_password', views.new_password),

]
