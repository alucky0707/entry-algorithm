(function () {
  'use strict';

  var
  i,
  ARR_LENGTH = 1000000,
  ARR = [],
  NS_LENGTH = 1000,
  NS = [];

  //initialize
  for (i = 0; i < ARR_LENGTH; i++) ARR.push(~~(Math.random() * ARR_LENGTH / 2));
  for (i = 0; i < NS_LENGTH; i++) NS.push(~~(Math.random() * ARR_LENGTH / 2));

  //example 1
  function tryExample1() {
    var
    i, j,
    allFlag = true, flag;
    
    for (i = 0; i < NS_LENGTH; i++) {
      flag = false;
      for (j = 0; j < ARR_LENGTH; j++) {
        if (NS[i] === ARR[j]) flag = true;
      }
      
      allFlag = allFlag && flag;
    }
    
    return allFlag;
  }
  
  //example3
  function mergeSort(arr, min, max) {
    var
    mid, tmp, i, j, k;
    switch (max - min) {
    case 0: return arr;
    case 1:
      if (arr[min] > arr[max]) {
        swap(arr, min, max);
      }
      return arr;
    default:
      var mid = Math.floor((min + max) / 2);
      mergeSort(arr, min, mid);
      mergeSort(arr, mid+1, max);
      var i = min, j = mid+1;
      var tmp = [];
      for (k = 0; k < max - min + 1; k++) {
        if (i > mid) {
          tmp[k] = arr[j++];
        } else if (j > max) {
          tmp[k] = arr[i++];
        } else if (arr[i] > arr[j]) {
          tmp[k] = arr[j++];
        } else {
          tmp[k] = arr[i++];
        }
      }
      for (k = 0; k < max - min + 1; k++) {
        arr[min + k] = tmp[k];
      }
      return arr;
    }
  }
  
  function swap(xs, i, j) {
    var
    tmp = xs[i];
    xs[i] = xs[j];
    xs[j] = tmp;
  }
  
  function tryExample3() {
    var
    i, N, ARR_, min, max, mid,
    flag, allFlag = true;
    
    ARR_ = ARR.slice(0);
    mergeSort(ARR_, 0, ARR_LENGTH-1);

    for (i = 0; i < NS_LENGTH; i++) {
      N = NS[i];
      
      flag = false;
      min = 0, max = ARR_LENGTH-1;
      
      while(min <= max) {
        mid = Math.floor((min + max) / 2);
      
        if (ARR_[mid] === N) {
          flag = true;
          break;
        } else if (N < ARR_[mid]) {
          max = mid - 1;
        } else if (N > ARR_[mid]) {
          min = mid + 1;
        }
      }
  
      if (!flag) {
        allFlag = false;
        break;
      }
    }
    
    return allFlag;
  }
  
  //example4
  function tryExample4() {
    var
    i, flag,
    backet = [];

    for (i = 0; i < ARR_LENGTH; i++) {
      backet[ARR[i]] = true;
    }
    
    flag = true;
    for (i = 0; i < NS_LENGTH; i++) {
      if (!backet[NS[i]]) {
        flag = false;
        break;
      }
    }
    
    return flag;
  }

  //benchmark
  function doBenchmark(run) {
    var
    start = Date.now(),
    res = run();
    
    return {
      time: Date.now() - start,
      result: res,
    };
  }

  //add event handlers
  var
  $ = document.getElementById.bind(document);
  
  function benchListener(run) {
    var
    running = false;
    
    return function (ev) {
      if (running) return;
      running = true;
      
      var
      temp = ev.target.innerHTML,
      bench;
      ev.target.innerHTML = '実行中…';

      setTimeout(function () {
        bench = doBenchmark(run);

        alert(resultToText(bench.result));
        alert('実行時間:' + (bench.time / 1000).toFixed(2) + 's');
        
        running = false;
        ev.target.innerHTML = temp;
      }, 10);
    };
  }
  
  $('try-example1').addEventListener('click', benchListener(tryExample1), true);
  
  $('try-example2').addEventListener('click', (function () {
    var
    started = false,
    ARR = [1,1,1,3,5,6,7,7,8,9],
    N = 3,
    min = 0, max = 9,
    tbl = $('example2-range'),
    tds = tbl.querySelectorAll('td');
    
    function init(ev) {
      min = 0; max = 9;
      started = false;
      ev.target.innerHTML = '実行';
    }
    
    function tblSelect(mid) {
      var
      i;
      for (i = 0; i < tds.length; i++) {
        tds[i].setAttribute('class',
          i === min ? 'range-min' :
          i === mid ? 'range-mid' :
          i === max ? 'range-max' : '');
      }
    }
    
    return function (ev) {
      var
      mid;
      if (!started) {
        N = parseInt(prompt('Nの値を入力', 3), 10);
        if (N !== N) {
          alert('入力値が不正です');
          return;
        }
        started = true;
      }
      
      if (min <= max) {
        mid = Math.floor((max + min) / 2);
        
        ev.target.innerHTML = '次のステップ';
        
        if (N === ARR[mid]) {
          alert('入ってるよ');
          init(ev);
        } else if (N < ARR[mid]) {
          max = mid - 1;
        } else if (N > ARR[mid]) {
          min = mid + 1;
        }
        
        tblSelect(Math.floor((max + min) / 2));
      } else {
        alert('入ってないよ');
        init(ev);
      }
    };
  })(), true);
  
  $('try-example3').addEventListener('click', benchListener(tryExample3), true);
  $('try-example4').addEventListener('click', benchListener(tryExample4), true);
  
  //misc
  function resultToText(res) {
    return res ? '全部入ってたよ' : '全部入ってなかったよ';
  }

})();
