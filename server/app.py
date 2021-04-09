from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
from flask_cors import CORS
# DB configurations
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(400))

    def __init__(self, name, description):
        self.name = name
        self.description = description


class ExerciseSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'description')


class Routine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(400))


exercise_schema = ExerciseSchema()
exercises_schema = ExerciseSchema(many=True)


@app.route('/exercise', methods=['GET'])
def get_exercises():
    exercises = Exercise.query.all()
    result = exercises_schema.dump(exercises)
    print(result)
    return jsonify(result)


@app.route('/exercise/<id>', methods=['GET'])
def get_product(id):
    exercise = Exercise.query.get(id)
    return exercise_schema.jsonify(exercise)


@app.route('/exercise/<id>', methods=['PATCH'])
def update_product(id):
    exercise = Exercise.query.get(id)

    name = request.json['name']
    description = request.json['description']

    exercise.name = name
    exercise.description = description

    db.session.commit()

    return exercise_schema.jsonify(exercise)


@app.route('/exercise/<id>', methods=['DELETE'])
def delete_product(id):
    exercise = Exercise.query.get(id)
    db.session.delete(exercise)
    db.session.commit()

    return exercise_schema.jsonify(exercise)


@app.route('/exercise', methods=['POST'])
def add_exercise():
    body = request.get_json()
    name = body["name"]
    description = body["description"]
    exercise = Exercise(name, description)
    db.session.add(exercise)
    db.session.commit()
    return exercise_schema.jsonify(exercise)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=105)
