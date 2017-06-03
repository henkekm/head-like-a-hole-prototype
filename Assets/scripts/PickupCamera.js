#pragma strict

var throwableCamera : GameObject;
var cameraPosition : GameObject;
var motorScript : CharacterMotor;
var freelookScript : MouseLook;
var throwVelocity = 200;
private var cameraIsHeld : boolean = false;
private var cameraIsPickupable : boolean = true;

function Start ()
{
	InitializeCamera();
}

function Update ()
{
	ThrowCamera();
	Footsteps();
}

function OnTriggerEnter(collision : Collider)
{
	Debug.Log("The player is triggering "+collision.gameObject);
	if(collision.gameObject.name == "CameraTrigger")
	{
		DisableMovement();
		EnableFreelook();
		throwableCamera.transform.position = cameraPosition.transform.position;
		throwableCamera.rigidbody.isKinematic = true;
		cameraIsHeld = true;
		
		cameraIsPickupable = false;
	}
}

function ThrowCamera()
{
    if (Input.GetButtonDown("Fire1") && cameraIsHeld == true)
    {
		throwableCamera.rigidbody.isKinematic = false;
		throwableCamera.rigidbody.freezeRotation = false;
		
 	    throwableCamera.rigidbody.AddForce(throwableCamera.transform.forward * throwVelocity);
 	    
 	    cameraIsHeld = false;
 	    
 	    EnableMovement();
 	    DisableFreelook();
// 	    cameraIsPickupable = true;
    }
}

function InitializeCamera()
{
	DisableFreelook();
}

function DisableMovement()
{
	motorScript = GetComponent(CharacterMotor); 
	motorScript.enabled = false;	
}

function EnableMovement()
{
//	motorScript = GetComponent(CharacterMotor); 
	motorScript.enabled = true;
}

function DisableFreelook()
{
	freelookScript = throwableCamera.GetComponent(MouseLook);
	freelookScript.enabled = false;
}

function EnableFreelook()
{
	freelookScript = throwableCamera.GetComponent(MouseLook);
	freelookScript.enabled = true;
}

function Footsteps()
{
	if (cameraIsHeld == false)
	{
		if (Input.GetButton("Horizontal") || Input.GetButton("Vertical"))
		{
			if(!audio.isPlaying)
			{
	        	audio.Play();
	        }
	    }
	    else
	    {
	    	audio.Stop();
	    }
	}
	else
	{
		audio.Stop();
	}
}