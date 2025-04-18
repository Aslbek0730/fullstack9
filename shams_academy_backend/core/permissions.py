from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the object.
        return obj.author == request.user

class IsTeacherOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow teachers or admins to perform certain actions.
    """
    def has_permission(self, request, view):
        # Allow read-only access for all authenticated users
        if request.method in permissions.SAFE_METHODS:
            return request.user and request.user.is_authenticated
        
        # Only allow teachers and admins to perform write operations
        return request.user and request.user.is_authenticated and (
            request.user.role == 'teacher' or request.user.is_staff
        )

class IsEnrolledInCourse(permissions.BasePermission):
    """
    Custom permission to only allow enrolled students to access course content.
    """
    def has_object_permission(self, request, view, obj):
        # Allow teachers and admins to access all content
        if request.user.role == 'teacher' or request.user.is_staff:
            return True
        
        # Check if the user is enrolled in the course
        return obj.payments.filter(user=request.user, status='success').exists()

class IsCourseTeacher(permissions.BasePermission):
    """
    Custom permission to only allow the teacher of a course to modify it.
    """
    def has_object_permission(self, request, view, obj):
        # Allow read-only access for all authenticated users
        if request.method in permissions.SAFE_METHODS:
            return request.user and request.user.is_authenticated
        
        # Only allow the course teacher to modify the course
        return obj.teacher == request.user 