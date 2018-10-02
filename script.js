var Node = function(value, parent) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.parent = parent;
  return this;
};

var BinaryTree = function () {
  this.root = null;
};


BinaryTree.prototype.Insert = function (value){
 for(var i=0; i < arguments.length; i++){
  if(!this.root) 
    this.root = new Node(arguments[i]);
  else {
    var value = arguments[i];
    (function insert(newNode){ 
      if(value < newNode.value) {
        if(!newNode.left) 
          newNode.left = new Node(value, newNode);  
        else 
          insert(newNode.left);
      } 
      else 
        if(!newNode.right) 
          newNode.right = new Node(value, newNode);  
        else 
          insert(newNode.right);
      })(this.root);
    }
  }
  return this;
};

BinaryTree.prototype.GetNode = function(value) {
  var node = this.root;
  var get = function(node) {
    if (!node) return null;
    if (value === node.value) 
      return node;
    else if (value > node.value) 
      return get(node.right);
    else if (value < node.value) 
      return get(node.left);
  };
  return get(node);
};

BinaryTree.prototype.DeleteNode = function(value){
 for(var i=0; i < arguments.length; i++){
  var node = this.GetNode(arguments[i]);
  if(node){
        //se dois filhos não existem..
        if(!node.left && !node.right){
          //validar se o nó será raiz ou direita
          if(node.parent.left === node)
            node.parent.left = null;
          else 
            node.parent.right = null;
        }
      //verifica  se o nó da direita existe
      else if(!node.left) {
        //verifica se o nó não é raiz
        if(node.parent){
          if(node.parent.left === node)
            node.parent.left = node.right;
          else 
            node.parent.right = node.right;
        }
        else {
          this.root = node.right;
          this.root.parent = null;
        }
      }
      //verifica  se o nó da esquerda existe 
      else if(!node.right) {
          //verifica se o nó não é raiz
          if(node.parent){
            if(node.parent.left === node)
              node.parent.left = node.left;
            else 
             node.parent.right = node.left;
         }
         else {
          this.root = node.left;
          this.root.parent = null;
        }
      }    
      //se existem dois filhos
      else if (node.left && node.right){ 
        //verifica se o nó não é raiz
        if(node.parent) 
        {
          if(node.parent.left === node)
            node.parent.left = node.right;
          else 
            node.parent.right = node.right;
        }
        else {
          this.root = node.right;
          this.root.parent = null;
        }
        
        node.right.parent = node.parent;
        leftnode = node.left;
        node = node.right;
        //encontrar menor nó da esquerda
        while(node.left)
          node = node.left;

        node.left = leftnode; 
        leftnode.parent = node;
      }    
    }
  }
  return this;
};



var NewBinaryTree = function(){
  BinaryTree.apply(this,arguments);
};

function extend(child, parent){
  var Temp = function(){};
  Temp.prototype = parent.prototype;
  child.prototype = new Temp();
  child.prototype.constructor = child;
  child.superclass = parent.prototype;
  return child;
}

extend(NewBinaryTree, BinaryTree);



BinaryTree.prototype.preOrder = function(){
  document.querySelector('span').innerHTML = document.querySelector('span').innerHTML + '</br> Pré Ordem: ';    
  (function preOrder(node) {
    //window.document.write(node.value + "<br/>"); 
    document.querySelector('span').innerHTML = document.querySelector('span').innerHTML + node.value +', ';    
    //console.log(node.value);
    if(node.left) {
      preOrder(node.left);
    }
    if(node.right) {
      preOrder(node.right);
    }
  })(this.root);
}


BinaryTree.prototype.inOrder = function(){
  document.querySelector('span').innerHTML = document.querySelector('span').innerHTML + '</br> Em ordem: ';
  (function inOrder(node) {
    if(node.left) {
      inOrder(node.left);
    }
    document.querySelector('span').innerHTML = document.querySelector('span').innerHTML + node.value +', ';
    //console.log(node.value);
    if(node.right) {
      inOrder(node.right);
    }
  })(this.root);
}


BinaryTree.prototype.posOrder = function(){
  document.querySelector('span').innerHTML = document.querySelector('span').innerHTML + '</br> Pos Ordem: ';
  (function posOrder(node) { 
    if(node.left) {
      posOrder(node.left);
    }
    if(node.right) {
      posOrder(node.right);
    }
    document.querySelector('span').innerHTML = document.querySelector('span').innerHTML + node.value +', ';
    //console.log(node.value);
  })(this.root);
}


BinaryTree.prototype.search = function(){
  (function search(node) {
    if(node.left) {
      preOrder(node.left);
    }
    if(node.right) {
      preOrder(node.right);
    }
    var numSearch = document.getElementById("numSearch").value;
    if(this.root == null){
      return this.root;
    }
    if(this.root != null){
      if(this.root.value == numSearch){
        alert(this.root.value);
      }
    }
  })(this.root);
}

//funções para mandar/pegar para/do  html
function clearView(){
  document.getElementById("resultado").innerHTML = ""; 
}

function insert() {
  var NumInsert = document.getElementById("numInsert").value;
  bt.Insert(NumInsert);

  show();
}

function show(){
  clearView();

  //console.log("pré ordem");
  bt.preOrder();

  //console.log("em ordem");
  bt.inOrder();

 // console.log("pós ordem");
  bt.posOrder();
}

function remove(){
  var NumRemove = document.getElementById("numRemove").value;
  bt.DeleteNode(NumRemove);

  show();
}
function search(){
  //var numSearch = document.getElementById("numSearch").value;
  bt.search();

}



var bt = new NewBinaryTree();
bt.Insert(10,20,30,40,50);
show();
//bt.DeleteNode(10);


//console.log("pré ordem");
//bt.preOrder();

//console.log("em ordem");
//bt.inOrder();

//console.log("pós ordem");
//bt.posOrder();
