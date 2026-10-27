from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse


def health_check(request):
    return HttpResponse("OK", status=200)


urlpatterns = [
    path("healthz", health_check, name="health_check"),
    path("admin/", admin.site.urls),
    path("", include("animais.urls")),
]