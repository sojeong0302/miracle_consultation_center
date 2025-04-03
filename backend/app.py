from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from datetime import date
from flask_migrate import Migrate
import random
import string


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
bcrypt = Bcrypt(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"

db = SQLAlchemy(app)
migrate = Migrate(app, db)


class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    adminName = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nickName = db.Column(db.String(80), nullable=False)
    date = db.Column(db.Date, nullable=False, default=date.today)
    content = db.Column(db.String(1000), nullable=False)
    isChecked = db.Column(db.Boolean, nullable=False, default=False)
    code = db.Column(db.String(10), nullable=False)
    answer = db.Column(db.String(1000), default=None)


with app.app_context():
    db.create_all()


# 랜덤 code 생성
def generate_unique_code():
    while True:
        new_code = "".join(random.choices(string.ascii_letters + string.digits, k=12))

        existing = User.query.filter_by(code=new_code).first()

        if not existing:
            return new_code


@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "필수 데이터를 포함해주세요."}), 400

        admin_Name = data.get("adminName")
        password = data.get("password")

        if not admin_Name or not password:
            return jsonify({"error": "아이디와 비밀번호를 모두 입력해야 합니다."}), 400

        existing_admin = Admin.query.filter_by(adminName=admin_Name).first()
        if existing_admin:
            return jsonify({"error": "이미 존재하는 아이디입니다."}), 409

        hashed_pw = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
        new_admin = Admin(adminName=data["adminName"], password=hashed_pw)
        db.session.add(new_admin)
        db.session.commit()

        return (
            jsonify(
                {
                    "message": "관리자가 추가되었습니다.",
                    "id": new_admin.id,
                    "adminName": new_admin.adminName,
                    "password": new_admin.password,
                }
            ),
            201,
        )

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": e}), 500


@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.json

        if not data:
            return jsonify({"error": "필수 데이터를 포함해주세요."}), 400

        admin = Admin.query.filter_by(adminName=data["adminName"]).first()

        if not admin or not bcrypt.check_password_hash(
            admin.password, data["password"]
        ):
            return jsonify({"message": "아이디 비밀번호를 확인해주세요."}), 400

        return jsonify({"message": "로그인 성공했습니다."}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": e}), 500


@app.route("/write", methods=["POST"])
def write():
    try:
        data = request.json
        new_code = generate_unique_code()

        new_write = User(
            nickName=data["nickName"],
            date=date.today(),
            content=data["content"],
            isChecked=data.get("isChecked", False),
            code=new_code,
            answer=data.get("answer", None),
        )

        if not data.get("nickName"):
            return jsonify({"error": "닉네임을 입력해주세요."}), 400

        if not data.get("content"):
            return jsonify({"error": "상담 내용을 입력해주세요."}), 400

        db.session.add(new_write)
        db.session.commit()

        return (
            jsonify(
                {
                    "message": "작성 완료!",
                    "id": new_write.id,
                    "nickName": new_write.nickName,
                    "date": new_write.date,
                    "content": new_write.content,
                    "isChecked": new_write.isChecked,
                    "code": new_write.code,
                    "answer": new_write.answer,
                }
            ),
            201,
        )

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": e}), 500


@app.route("/writeList", methods=["GET"])
def writeList():
    try:
        data = User.query.order_by(User.isChecked.asc()).all()

        if not data:
            return jsonify({"message": "조회된 데이터가 없습니다."}), 404

        users_data = [
            {
                "id": user.id,
                "nickName": user.nickName,
                "date": user.date.strftime("%Y-%m-%d"),
                "content": user.content,
                "isChecked": user.isChecked,
                "code": user.code,
                "answer": user.answer,
            }
            for user in data
        ]
        return (
            jsonify(users_data),
            200,
        )

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": e}), 500


@app.route("/view/<URLcode>", methods=["GET"])
def view(URLcode):
    try:
        data = User.query.filter_by(code=URLcode).first()

        if not data:
            return jsonify({"error": "해당 code에 대한 정보가 없습니다."}), 404

        return jsonify(
            {
                "content": data.content,
                "answer": data.answer,
                "isChecked": data.isChecked,
            },
            200,
        )

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": e}), 500


@app.route("/answer/<URLcode>", methods=["PATCH"])
def answer(URLcode):
    try:
        data = request.json

        # URL에서 받은 code로 해당 사용자를 찾기
        item = User.query.filter_by(code=URLcode).first()

        # 해당 code가 없으면 에러 반환
        if not item:
            return jsonify({"error": "해당 code에 대한 정보가 없습니다."}), 404

        answer = data.get("answer")

        if "answer" not in data:
            return jsonify({"error": "필수 데이터를 포함해주세요."})

        if not answer.strip():
            return jsonify({"error": "답변을 입력해주세요."})

        item.answer = answer
        item.isChecked = True
        db.session.commit()

        return jsonify({"message": "답변을 성공했습니다."}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": e}), 500


@app.route("/getAnswerByCode", methods=["GET"])
def getAnswerByCode():
    code = request.args.get("code")
    if not code:
        return jsonify({"error": "code parameter is required"}), 400
    user = User.query.filter_by(code=code).first()
    if user:
        user_data = {"nickName": user.nickName, "answer": user.answer}
        return jsonify(user_data), 200
    else:
        return jsonify({"error": "No user found with this code"}), 404


if __name__ == "__main__":
    app.run(debug=True)
