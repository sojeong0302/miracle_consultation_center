from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from datetime import date
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
bcrypt = Bcrypt(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Admin(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    adminName=db.Column(db.String(80),unique=True, nullable=False)
    password=db.Column(db.String(120),nullable=False)

class User(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    nickName=db.Column(db.String(80), nullable=False)
    date = db.Column(db.Date, nullable=False, default=date.today)
    content=db.Column(db.String(1000),nullable=False)
    isChecked = db.Column(db.Boolean, nullable=False, default=False)
    code=db.Column(db.String(10),nullable=False)
    answer=db.Column(db.String(1000),default=None)

with app.app_context():
    db.create_all() 

@app.route('/register',methods=['POST'])
def register():
    try:
        data=request.json
        if not data:
            return jsonify({"error": "필수 데이터를 포함해주세요."}), 400
        
        admin_Name = data.get('adminName')
        password = data.get('password')

        if not admin_Name or not password:
            return jsonify({"error": "아이디와 비밀번호를 모두 입력해야 합니다."}), 400
        
        existing_admin = Admin.query.filter_by(adminName=admin_Name).first()
        if existing_admin:
            return jsonify({"error": "이미 존재하는 아이디입니다."}), 409

        
        hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_admin = Admin(adminName=data['adminName'], password=hashed_pw)
        db.session.add(new_admin)
        db.session.commit()
        
        return jsonify({"message": "관리자가 추가되었습니다."}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": e}), 500




@app.route('/login',methods=['POST'])
def login():
    data=request.json
    admin=Admin.query.filter_by(adminName=data['adminName']).first()
    if admin and bcrypt.check_password_hash(admin.password, data['password']):
        return jsonify({"message": "로그인 성공!!!"})
    else:
         return jsonify({"message": "로그인 실패 ㅜㅜ"}), 401
    
@app.route('/write',methods=['POST'])
def write():
    data=request.json

    if not data:
        return jsonify({"error": "잘못된 요청입니다."}), 400

    new_user = User(
        nickName=data['nickName'],
        date=date.today(),
        content=data['content'],
        isChecked=data.get('isChecked', False),
        code=data['code'],
        answer=data.get('answer', None)
    )

    db.session.add(new_user)  # DB에 추가
    db.session.commit()  # 변경사항 저장

    return jsonify({"message": "작성 완료!", "user_id": new_user.id}), 201
        
@app.route('/writeList', methods=['GET'])
def writeList():
    users =  User.query.order_by(User.isChecked.asc()).all()  # 모든 데이터 조회
    users_data = [
        {
            "id": user.id,
            "nickName": user.nickName,
            "date": user.date.strftime('%Y-%m-%d'),  # 날짜 포맷 변경
            "content": user.content,
            "isChecked": user.isChecked,
            "code": user.code,
            "answer": user.answer
        }
        for user in users
    ]
    return jsonify(users_data), 200  # JSON 형식으로 반환

@app.route('/view/<code>', methods=['GET'])
def view(code):
    item = User.query.filter_by(code=code).first()  # code에 맞는 첫 번째 항목 찾기
    
    if item:
        return jsonify({
            'content': item.content,
            'answer': item.answer,
            'isChecked':item.isChecked
        })
    else:
        return jsonify({'error': 'Code not found'}), 404
    
@app.route('/answer/<code>', methods=['PATCH'])
def answer(code):
    data = request.json
    answer = data.get('answer')  # 클라이언트에서 전달받은 답변

    # code로 해당 사용자를 찾기
    item = User.query.filter_by(code=code).first()
    
    if not item:  # 해당 사용자가 없으면 에러 반환
        return jsonify({"error": "User not found"}), 404

    # 답변 업데이트
    item.answer = answer
    item.isChecked = True
    db.session.commit()

    return jsonify({"message": "답변 성공!!"}), 200

    
@app.route('/getAnswerByCode',methods=['GET'])
def getAnswerByCode():
    code = request.args.get('code')
    if not code:
        return jsonify({"error": "code parameter is required"}), 400
    user = User.query.filter_by(code=code).first()
    if user:
        user_data = {
            "nickName": user.nickName,
            "answer": user.answer
        }
        return jsonify(user_data), 200
    else:
        return jsonify({"error": "No user found with this code"}), 404

if __name__ == '__main__':
    app.run(debug=True)
