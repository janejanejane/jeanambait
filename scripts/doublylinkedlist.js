//class for a node used in the list
function ListNode(info){
	this.data = info;
	this.prev = null;
	this.next = null;
}

//definition of a doubly linked list
function DoublyLinkedList(){
	this._length = 0; //start length is zero
	this._head = null; //start head is null
	this._tail = null; //start tail is null
}

DoublyLinkedList.prototype = {
	add: function(data){		//add function always adds to the last of the list
		var node = new ListNode(data); //instantiate node object where data is set to the parameter given
		
		if(this._length == 0){ //if this is the first add, where length is zero, add node to both head and tail of the list
			this._head = node;
			this._tail = node;
		}else{	//if this is not the first node, where length is > zero, 
			this._tail.next = node; //set the next value of the list's tail object to the node 
			node.prev = this._tail; //then set the node's prev to this list's tail
			this._tail = node; //finally point the list's tail to the newly added node
		}
		node.next = this._head; //then set the node's next to this list's head to have a circular definition of a list
		this._head.prev = node; //point the list's head to the newly added node to have a circular definition of a list
		
		this._length++; //update length
	},
	
	item: function(index){ //item function finds the object specified by the number parameter
		if(index > -1 && index < this._length){ //make sure that the number is within the list
			var curr = this._head; //start traversing at the list head
			var count = 0; //counter for the items traversed
			
			while(count != index){ //loop over the list if the counter is not equal to the number parameter
				curr = curr.next; //iterate through the list
				count++; //update counter of traversal
			}
			
			return curr; //return object found
		}else{
			return null; //if the number parameter is not within the list, return null pointer
		}
	}
};

/*
//sample
var head = new DoublyLinkedList();
for(var i=0; i<5; i++){
	head.add(i);
	console.log("current element: " + head.item(i).data);
	console.log("previous element: " + head.item(i).prev.data);
	console.log("next element: " + head.item(i).next.data);
}
**/