import React, { useState } from 'react';
import base64 from 'react-native-base64';
import firebase from 'firebase';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: 'AIzaSyC7g_q3t1EeNe9fWWTVuzVO_YUZPvE_L2o',
  authDomain: 'mobile-3fb61.firebaseapp.com',  
  databaseURL: 'https://mobile-3fb61-default-rtdb.firebaseio.com',
  projectId: 'mobile-3fb61',
  storageBucket: 'mobile-3fb61.appspot.com',
  messagingSenderId: '19463569645',
  appId: '1:19463569645:web:4367d0510ff4f953218ce4',
  measurementId: 'G-EKYT3MET3M',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
}
// Lấy danh sách products
export function getAllProduct() {
  const productsModel = firebase.database().ref('/products');
  return productsModel
    .once('value')
    .then((snapshot) => {
      //  console.log(snapshot.val());
      return objectToArray(snapshot.val());
    })
    .catch((err) => alert(err));
}
// Lấy danh sách các user:
export function getAllUser() {
  const usersModel = firebase.database().ref('/users');
  return usersModel
    .once('value')
    .then((snapshot) => {
      return objectToArray(snapshot.val());
    })
    .catch((err) => alert(err));
}
// lấy user từ id:
export function getUserFromId(idUser) {
  const usersModel = firebase.database().ref('/users');
  return usersModel
    .child(idUser)
    .once('value')
    .then((snapshot) => {
      console.log(snapshot.val());
      return snapshot.val();
    })
    .catch((err) => alert(err));
}
// sửa product :
export function updateProduct(product) {
  const data = firebase.database().ref('/products');
  data.child(product.id).set({
    description: product.description,
    evalute: product.evalute,
    image: product.image,
    name: product.name,
    price: product.price,
    type: product.type,
  });
}
// thêm product :
export function addProduct(product) {
  const data = firebase.database().ref('/products');
  data.push({
    description: product.description,
    evalute: product.evalute,
    image: product.image,
    name: product.name,
    price: product.price,
    type: product.type,
  });
}

// lấy danh sách các hóa đơn:
export function getAllBill() {
  const data = firebase.database().ref('/bills');
  return data
    .once('value')
    .then((snapshot) => {
      console.log(snapshot.val());
      return objectToArray(snapshot.val());
    })
    .catch((err) => alert(err));
}
// lấy  hóa đơn của user:
export function getAllBillUser(user) {
  const data = firebase.database().ref('/bills');
  return data
    .once('value')
    .then((snapshot) => {
      let listBill = objectToArray(snapshot.val());
      return listBill.filter((o) => o.username === user.username);
    })
    .catch((err) => alert(err));
}
// xóa 1 hóa đơn:
export function deleteBill(bill) {
  const data = firebase.database().ref('/bills');
  data.child(bill.id).remove();
}
//xóa tất cả sản phẩm trong giỏ hàng:
export function deleteAllProductInCart(user) {
  const data = firebase.database().ref('/carts');
  data.child(user.id).remove();
  return true;
}
// ép kiểu từ object về array
export const objectToArray = (object, nameKey = 'id') => {
  const objectArr = [];
  for (const key in object) {
    const newObject = { ...object[key], [nameKey]: key };
    if (Object.prototype.hasOwnProperty.call(object, key))
      objectArr.push(newObject);
  }
  return objectArr;
};
// xóa product
export function deleteProduct(id) {
  const data = firebase.database().ref('/products');
  data.child(id).remove();
}
// lấy sản phẩm trong giỏ hàng của user:
export function getProductInCart(user) {
  const data = firebase.database().ref('/carts');
  return data
    .child(user.id)
    .once('value')
    .then((snapshot) => {
      return objectToArray(snapshot.val());
    })
    .catch((err) => alert(err));
}
// tăng số lượng sản phẩm trong giỏ hàng
export function setNumInproductUserUp(user, product) {
  const data = firebase.database().ref('/carts');
  data
    .child(user.id)
    .child(product.id)
    .set({
      image: product.image,
      name: product.name,
      num: product.num + 1,
      price: product.price,
      product_id: product.product_id,
    });
}
// giảm số lượng sản phẩm trong giỏ hàng
export function setNumInproductUserDown(user, product) {
  const data = firebase.database().ref('/carts');
  if (product.num === 1) {
    data.child(user.id).child(product.id).remove();
  } else {
    data
      .child(user.id)
      .child(product.id)
      .set({
        image: product.image,
        name: product.name,
        num: product.num - 1,
        price: product.price,
        product_id: product.product_id,
      });
  }
}
// thêm sản phẩm vào giỏ hàng:
export function addProductInCart(user, product) {
  const data = firebase.database().ref('/carts');

  const getProductInCartAsync = async () => {
    const products = await getProductInCart(user);
    let index = products.find((o) => o.product_id === product.id);
    if (index) {
      index.num += 1;
      data.child(user.id).child(index.id).set({
        image: index.image,
        name: index.name,
        num: index.num,
        price: index.price,
        product_id: index.product_id,
      });
    } else {
      data.child(user.id).push({
        image: product.image,
        name: product.name,
        num: 1,
        price: product.price,
        product_id: product.id,
      });
    }
  };
  getProductInCartAsync();
}
// xóa  sản phẩm trong giỏ hàng:
export function deleteProductInCart(user, product) {
  const data = firebase.database().ref('/carts');
  data.child(user.id).child(product.id).remove();
}
// Khi duyệt đơn:
export function setBillStatus(bill) {
  const data = firebase.database().ref('/bills');
  data.child(bill.id).set({
    username: bill.username,
    products: bill.products,
    name: bill.name,
    status: 1, 
    id_user: bill.id_user,
  });
}
// nhận đơn:
export function setBillReceived(bill) {
  const data = firebase.database().ref('/bills');
  data.child(bill.id).set({
    username: bill.username,
    products: bill.products,
    name: bill.name,
    status: 2,
    id_user: bill.id_user,
  });
}
// thêm 1 hóa đơn sau khi click đặt hàng:
export function addBillToUser(user, listProduct) {
  const data = firebase.database().ref('/bills');
  // console.log(listProduct);
  listProduct.forEach((product) => {
    delete product.id;
  });

  data.push({
    username: user.username,
    products: listProduct,
    name: user.name,
    status: 0,
    id_user: user.id,
  });
  console.log({ username: user.username,
    products: listProduct,
    name: user.name,
    status: 0,
    id_user: user.id,})              
}
// tạo ra 1 user:
export function addUser(user) {
  user.password = base64.encode(user.password);

  const data = firebase.database().ref('/users');
  try {
    data
      .push({
        description: user.description,
        name: user.name,
        password: user.password,
        username: user.username,
        power: '0',
        image: user.image,
      })
      .then((response) => console.log(response));
  } catch (err) {
    alert(err);
  }

  //alert(user);
}
// update user:
export function updateUser(user) {
  const data = firebase.database().ref('/users');
  // console.log(user);
  data.child(user.id).set({
    description: user.description,
    name: user.name,
    password: user.password,
    username: user.username,
    power: user.power,
    image: user.image,
  });
}
// xóa user:
export function deleteUser(user) {
  const data = firebase.database().ref('/users');
  data.child(user.id).remove();
}
// lấy danh sách các sản phẩm yêu thích
export function getProductInLove(user) {
  const data = firebase.database().ref('/loves');
  return data
    .child(user.id)
    .once('value')
    .then((snapshot) => {
      return objectToArray(snapshot.val());
    })
    .catch((err) => alert(err));
}
// nhấn tym 1 sản phẩm từ user:
export function addLoveProductInUser(user, product) {
  const data = firebase.database().ref('/loves');
  data.child(user.id).push({
    id_product: product.id,
    description: product.description,
    evalute: product.evalute,
    image: product.image,
    name: product.name,
    price: product.price,
    type: product.type,
  });
}
// hủy tym 1 sản phẩm:
export function deleteLoveProductInUser(user, productLove) {
  const data = firebase.database().ref('/loves');

  data.child(user.id).child(productLove.id).remove();
}
// xóa sản phẩm đã bị xóa mà vẫn còn trong giỏ hàng:
export function deletetAllCart(id_product) {
  const data = firebase.database().ref('/carts');

  data
    .once('value')
    .then((snapshot) => {
      let listCart = objectToArray(snapshot.val());

      listCart.forEach((cart) => {
        firebase
          .database()
          .ref('/carts')
          .child(cart.id)
          .once('value')
          .then((snapshot) => {
            let cartInUser = objectToArray(snapshot.val());

            cartInUser.forEach((o) => {
              if (o.product_id === id_product) {
                data.child(cart.id).child(o.id).remove();
              }
            });
          })
          .catch((err) => alert(err));
      });
    })
    .catch((err) => alert(err));
}
// Lấy thông báo của người dùng:
export function getAllNotificationUser(user) {
  const productsModel = firebase.database().ref('/notifications');
  return productsModel
    .child(user.id)
    .once('value')
    .then((snapshot) => {
      return objectToArray(snapshot.val());
    })
    .catch((err) => alert(err));
}
// Thêm thông báo cho người dùng:
export function setNotificationUser(user, notification) {
  const productsModel = firebase.database().ref('/notifications');
  productsModel
    .child(user.id)
    .push({
      status: notification.status,
      title: notification.title,
      type: notification.type,
    })
    .catch((err) => alert(err));
}
// Xóa thông báo của người dùng
export function deleteNoticationUser(user, notification) {
  const productsModel = firebase.database().ref('/notifications');
  productsModel.child(user.id).child(notification.id).remove();
}
