from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models.db import User
import re

def is_valid_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@iitbhilai\.ac\.in$'
    return bool(re.match(pattern, email))

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')
    

def user_from_iitbhilai(form, field):
    # Checking if user exists
    email_to_check = field.data
    print(email_to_check)
    if is_valid_email(email_to_check):
        print(f"{email_to_check} is a valid email address for IIT Bhilai.")
    else:
        raise ValidationError('Email address not of IIT Bhilai.')
    # user = User.query.filter(User.email == email).first()
    # if user:
    #     
    


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), Email(message="Please enter a valid email"), user_exists, user_from_iitbhilai])
    password = StringField('password', validators=[DataRequired()])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    street_address = StringField('street_address', validators=[DataRequired()])
