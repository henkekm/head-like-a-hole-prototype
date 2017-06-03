#pragma strict
var throwable : GameObject;
var held : GameObject;


function Start () {

}

function Update () {
	ThrowRigidbody();
}

function ThrowRigidbody()
{
	var speed = 200;
 
    if (Input.GetButtonDown("Fire1"))
    {
    	throwable.transform.position = held.transform.position;
 	    throwable.rigidbody.AddForce(held.transform.forward * speed);
    }
}