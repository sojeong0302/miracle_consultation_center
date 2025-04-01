from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# SQLite 데이터베이스 설정 (mydatabase.db 파일이 자동으로 생성됨)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'

db = SQLAlchemy(app)

class Admin(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    adminName=db.Column(db.String(80),unique=True, nullable=False)
    password=db.Column(db.String(120),nullable=False)

with app.app_context():
    db.create_all() 

@app.route('/register',methods=['POST'])
def register():
    data=request.json
    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_admin = Admin(adminName=data['adminName'], password=hashed_pw)
    db.session.add(new_admin)
    db.session.commit()
    return jsonify({"message": "관리자가 추가되었습니다."}), 201

@app.route('/login',methods=['POST'])
def login():
    data=request.json
    admin=Admin.query.filter_by(adminName=data['adminName']).first()
    if admin and bcrypt.check_password_hash(admin.password, data['password']):
        return jsonify({"message": "로그인 성공!!!"})
    else:
         return jsonify({"message": "로그인 실패 ㅜㅜ"}), 401
        
if __name__ == '__main__':
    app.run(debug=True)
