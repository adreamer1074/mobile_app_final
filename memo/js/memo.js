"use strict"
//ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener('DOMContentLoaded', function () {
  //1.localStorageが使えるか確認
  if (typeof localStorage === "undefined") {
    window.alert("このブラウザはLocal Storage機能が実装されていません");
    return;
  } else {
    viewStorage(); //localstorage からデータの取得とデータ表示
    saveLocalStorage(); //2.localStorageへの保存
    delLocalStorage();
    selectTable();
    allClearLocalStorage(); // allclear localstorage
  }
}, false);

//データ選択
function selectTable() {
  const select = document.getElementById("select");
  select.addEventListener("click",

    function (e) {
      e.preventDefault()
      selectCheckBox("select");
    }, false
  );
}
//テーブルからデータ選択
function selectCheckBox(mode) {
  //let w_sel = "0"; //選択されていれば’１’にする
  let w_cnt = 0; //checkboxの数
  const chkbox1 = document.getElementsByName("chkbox1");
  const table1 = document.getElementById("table1");
  let w_textKey = ""; //work version up2 add
  let w_textMemo = ""; //work version up2 add

  for (let i = 0; i < chkbox1.length; i++) {
    if (chkbox1[i].checked) {
      if (w_cnt === 0) {
        w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
        w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
      }
      // return w_sel = "1";
      w_cnt++; //checkhox count
    }
  }
  document.getElementById("textKey").value = w_textKey;
  document.getElementById("textMemo").value = w_textMemo;

  if (mode === "select") {
    if (w_cnt === 1) {
      return w_cnt;
    }
    else {
      let w_msg = ("１つ選択してください。");
      Swal.fire({
        title: "Memo app",
        html: w_msg,
        type: "error",
        alllowOutsideClick: false,
      });
    }
  }
  else if (mode === "del") {
    if (w_cnt >= 1) {
      return w_cnt;
    } else {
      let w_msg = "１つ以上選択してください。";
      Swal.fire({
        title: "Memo app",
        html: w_msg,
        type: "error",
        alllowOutsideClick: false,
      });
    }
  }
}
function saveLocalStorage() {
  const save = document.getElementById("save");
  save.addEventListener("click",

    function (e) {
      e.preventDefault();
      const key = document.getElementById("textKey").value;
      const value = document.getElementById("textMemo").value;
      //値の入力チェック
      if (key == "" || value == "") {
        Swal.fire({
          title: "Memo app",
          html: "Key,Memoはいずれも必要です。",
          type: "error",
          allowOutsideClick: false,
        });
        return;
      } else {
        let w_msg = "LocalStorageに\n" + key + " " + value + "\nを保存しますか？";
        Swal.fire({
          title: "Memo app",
          html: w_msg,
          type: "question",
          showCancelButton: true,
        }).then(function (result) {
          if (result.value === true) {
            localStorage.setItem(key, value);
            viewStorage();
            let w_msg = "LocalStorageに" + key + "," + value + "を保存しました";
            Swal.fire({
              title: "Memo app",
              html: w_msg,
              type: "success",
              allowOutsideClick: false,
            });
            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
          }
        });
      }
    },
    false
  );
}


// 削除
function delLocalStorage() {
  const del = document.getElementById("del");
  del.addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      const chkbox1 = document.getElementsByName("chkbox1");
      const table1 = document.getElementById("table1");
      let w_cnt = 0;
      w_cnt = selectCheckBox("del");
      if (w_cnt >= 1) {
        let w_confirm =
          "LocalStorageから選択されている" + w_cnt + "件を削除しますか";
        Swal.fire({
          title: "Memo app",
          html: w_confirm,
          type: "question",
          showCancelButton: true,
        }).then(function (result) {
          if (result.value === true) {
            for (let i = 0; i < chkbox1.length; i++) {
              if (chkbox1[i].checked) {
                localStorage.removeItem(
                  table1.rows[i + 1].cells[1].firstChild.data
                );
              }
            }
            viewStorage();
            let w_msg = "LocalStorageから" + w_cnt + "件を削除しました。";
            Swal.fire({
              title: "Memo app",
              html: w_msg,
              type: "success",
              allowOutsideClick: false,
            });
            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
          }
        });
      }
    },
    false
  );
}
// allclear
function allClearLocalStorage() {
  const allClear = document.getElementById("allClear");
  allClear.addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      let w_confirm = "LocalStorageのデータを全て削除します。宜しでしょうか？";
      Swal.fire({
        title: "Memo app",
        html: w_confirm,
        type: "question",
        showCancelButton: true,
      }).then(function (result) {
        if (result.value === true) {
          localStorage.clear();
          viewStorage();
          let w_msg = "LocalStorgeのデータを全て削除しました。";
          Swal.fire({
            title: "Memo app",
            html: w_msg,
            type: "success",
            allowOutsideClick: false,
          });
          document.getElementById("textKey").value = "";
          document.getElementById("textMemo").value = "";
        }
      });
    },
    false
  );
}

// local storageからのデータの取得とテーブルへ表示
function viewStorage() {
  const list = document.getElementById("list");
  // Clear existing rows
  while (list.rows[0]) list.deleteRow(0);

  for (let i = 0; i < localStorage.length; i++) {
    let w_key = localStorage.key(i);

    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    list.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
    td2.innerHTML = w_key;
    td3.innerHTML = localStorage.getItem(w_key);
  }
  $("#table1").tablesorter({
    sortList: [[1, 0]]
  });
  $("#table1").trigger("update");
}
