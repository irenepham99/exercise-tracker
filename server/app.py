from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
from flask_cors import CORS
from datetime import datetime
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
    cues = db.Column(db.String(400))
    body_group = db.Column(db.String(100))
    compound = db.Column(db.Boolean)
    logs = db.relationship('Log', backref='exercise',
                           lazy=True, cascade="all, delete")

    def __init__(self, name, cues, body_group, compound):
        self.name = name
        self.cues = cues
        self.body_group = body_group
        self.compound = compound


class Log(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    weight = db.Column(db.Integer)
    sets = db.Column(db.Integer)
    reps = db.Column(db.Integer)
    exercise_id = db.Column(db.Integer, db.ForeignKey(
        'exercise.id'), nullable=False)

    def __init__(self, date, weight, sets, reps, exercise_id):
        self.date = date
        self.weight = weight
        self.sets = sets
        self.reps = reps
        self.exercise_id = exercise_id


class Routine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(400))
    exercises = db.relationship("Exercise", secondary="exerciseRoutine")

    def __init__(self, name, description):
        self.name = name
        self.description = description


class ExerciseRoutine(db.Model):
    __tablename__ = 'exerciseRoutine'
    id = db.Column(db.Integer, primary_key=True)
    routine_id = db.Column(db.Integer, db.ForeignKey('routine.id'))
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercise.id'))


class ExerciseRoutineSchema(ma.Schema):
    class Meta:
        fields = ('routine_id', 'exercise_id')


class ExerciseSchema(ma.Schema):
    class Meta:
        fields = ('id', "name", "cues", "body_group", "compound")


class RoutineSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Routine
        #fields = ('id', 'name', 'description', 'exercises')
    exercises = ma.List(ma.Nested(ExerciseSchema))


class LogSchema(ma.Schema):
    class Meta:
        fields = ('exercise_id', 'id', 'date', 'weight', 'reps', 'sets')


exercise_schema = ExerciseSchema()
exercises_schema = ExerciseSchema(many=True)
log_schema = LogSchema()
logs_schema = LogSchema(many=True)
routine_schema = RoutineSchema()
routines_schema = RoutineSchema(many=True)
exercisesRoutines_schema = ExerciseRoutineSchema(many=True)
exerciseRoutine_schema = ExerciseRoutineSchema()


@app.route('/exercise', methods=['GET'])
def get_exercises():
    exercises = Exercise.query.all()
    result = exercises_schema.dump(exercises)
    return jsonify(result)
    # this is the format all errors need to be in!!
    # response = jsonify({"message": "a test message"})
    # response.status_code = 403
    # return response


@app.route('/exercise/<id>', methods=['GET'])
def get_exercise(id):
    exercise = Exercise.query.get(id)
    return exercise_schema.jsonify(exercise)


@app.route('/exercise/<id>', methods=['PATCH'])
def update_exercise(id):
    exercise = Exercise.query.get(id)

    name = request.json['name']
    cues = request.json['cues']
    body_group = request.json['body_group']
    compound = request.json['compound']

    exercise.name = name
    exercise.cues = cues
    exercise.body_group = body_group
    exercise.compound = compound

    db.session.commit()

    return exercise_schema.jsonify(exercise)


@app.route('/exercise/<id>', methods=['DELETE'])
def delete_exercise(id):
    exercise = Exercise.query.get(id)
    db.session.delete(exercise)
    db.session.commit()

    return exercise_schema.jsonify(exercise)


@app.route('/exercise', methods=['POST'])
def add_exercise():
    body = request.get_json()
    name = body['name']
    cues = body['cues']
    body_group = body['body_group']
    compound = body['compound']

    exercise = Exercise(name, cues, body_group, compound)
    db.session.add(exercise)
    db.session.commit()
    return exercise_schema.jsonify(exercise)


@app.route('/exercise/<exercise_id>/log', methods=['POST'])
def log_exercise(exercise_id):
    body = request.get_json()
    date = body["date"]
    date_object = datetime.strptime(date, "%Y-%m-%d")
    weight = body["weight"]
    sets = body["sets"]
    reps = body["reps"]
    log = Log(date_object, weight, sets, reps, exercise_id)
    db.session.add(log)
    db.session.commit()
    return log_schema.jsonify(log)


@app.route('/exercise/<exercise_id>/log', methods=['GET'])
def get_log(exercise_id):
    # need to return for a specific exercise
    logs = Exercise.query.get(exercise_id).logs
    result = logs_schema.dump(logs)
    return jsonify(result)


@app.route('/routine', methods=['POST'])
def add_routine():
    body = request.get_json()
    name = body["name"]
    description = body["description"]
    exercise_ids = body["exercise_ids"]
    routine = Routine(name, description)
    for exercise_id in exercise_ids:
        routine.exercises.append(Exercise.query.get(exercise_id))
    db.session.add(routine)
    db.session.commit()
    result = routine_schema.dump(routine)
    return jsonify(result)


@app.route('/routine/<id>', methods=['PATCH'])
def update_routine(id):
    body = request.get_json()
    routine = Routine.query.get(id)

    name = request.json['name']
    description = request.json['description']
    exercise_ids = body["exercise_ids"]

    new_exercises = []
    for exercise_id in exercise_ids:
        new_exercises.append(Exercise.query.get(exercise_id))

    routine.name = name
    routine.description = description
    routine.exercises = new_exercises

    db.session.commit()

    return routine_schema.jsonify(routine)


@app.route('/routine/<id>', methods=['GET'])
def get_routine(id):
    exercise = Routine.query.get(id)
    return routine_schema.jsonify(exercise)


@app.route('/routine', methods=['GET'])
def get_routines():
    routines = Routine.query.all()
    result = routines_schema.dump(routines)
    return jsonify(result)


@app.route('/routine/<id>', methods=['DELETE'])
def delete_routine(id):
    routine = Routine.query.get(id)
    db.session.delete(routine)
    db.session.commit()

    return routine_schema.jsonify(routine)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=105)
