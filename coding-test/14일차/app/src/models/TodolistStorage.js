"use strict";

const db = require('../config/db');

class TodolistStorage {

    //db에서 저장된 데이터를 불러옴
    static loadTodo() {
        return new Promise((resolve, reject)=> {
            const query = "SELECT id,description,is_check FROM todo";
            db.query(query, (err, data)=> {
                if(err) reject (`${err}`);
                resolve (data);
            })
        })
    }

    //db에서 저장된 데이터 수정(checkbox동작 시)
    static reviseTodo(id, is_check) {
        return new Promise((resolve, reject)=> {
            const query = "UPDATE todo SET is_check=(?) WHERE id = (?)";
            db.query(query, [is_check ,id], (err, data)=> {
                if(err) reject (`${err}`);
                resolve (data);
            })
        })
    }

    //db에 새로운 데이터 저장(plus버튼 동작 시)
    static plusTodo(id, description) {
        return new Promise((resolve, reject)=>{
            const query = "INSERT INTO todo (id ,description) VALUES(?, ?);";
            db.query(query, [id, description], (err)=>{
                if(err) reject (`${err}`);
                resolve ({success : true});
            });
        }); 
    }
};

module.exports = TodolistStorage;