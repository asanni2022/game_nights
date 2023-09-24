import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog'
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import NewPassword from './NewPassword';

export default function EditAccountCard({ userInfo, setEdit, edit, setDeleteUserChannels, client }) {
	const [username, setUsername] = useState(userInfo.username);
	const [email, setEmail] = useState(userInfo.email);
    const [firstname, setFirstname] = useState(userInfo.first_name)
    const [lastname, setLastname] = useState(userInfo.last_name)
    const [confirmationDialog, setConfirmationDialog] = useState(false)
    const [passwordDialog, setPasswordDialog] = useState(false)


	const updateUser = () => {
		axios
			.put("whoami", {
				username: username,
				email: email,
                first_name: firstname,
                last_name: lastname,
			})
			.then((response) => {
				// console.log("this is the response:", response);
				window.location.reload();
			});
		// .catch((error) => console.log(error));
	};

    const deleteUser = async ()=> {
        let res = await axios.delete("/whoami");
        window.location.replace("/");
    }
	const deleteAccount = (event) => {
        event.preventDefault();
        setDeleteUserChannels(true)
        window.location.replace("/#/chatroom")
        setTimeout(()=>{
            deleteUser()
        },600)
	};

	const editAccount = () => {
		setEdit(true);
	};

	const cancelButton = () => {
		setEdit(false);
	};

	const editFooter = (
		<span>
			<Button label="Save" icon="pi pi-check" onClick={updateUser} />
			<Button
				label="Cancel"
				icon="pi pi-times"
				className="p-button-secondary ml-2"
				onClick={cancelButton}
			/>
		</span>
	);
	const footer = (
		<span>
			<Button
				label="Edit Account"
				icon="pi pi-user-edit"
				onClick={editAccount}
			/>
			<Button
				label="Delete Account"
				className="p-button-danger ms-3"
				onClick={() => setConfirmationDialog(true)}
			/>
		</span>
	);
    
    return(
        <div>
        {edit ? 
            <div className="center-page">
                <Card title="Your Information" style={{ width: '25rem', marginBottom: '2em' }} footer={editFooter}>
                <Container>
                    <Row>
                        <Col>
                            <span className="ml-2">First Name</span>
                            <br></br>
                            <InputText value={firstname} id="accountFirstname" onChange={(e) => setFirstname(e.target.value)} />
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col>
                            <span className="ml-2">Last Name</span>
                            <br></br>
                            <InputText value={lastname} id="accountLastname" onChange={(e) => setLastname(e.target.value)} />
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col>
                            <span className="ml-2">Email</span>
                            <br></br>
                            <InputText value={email} id="accountEmail" onChange={(e) => setEmail(e.target.value)} />
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col>
                            <span className="ml-2">Password</span>
                            <br></br>
                            {/* <InputText value={username} id="accountUsername" onChange={(e) => setUsername(e.target.value)} /> */}
                            <Button
                                label='Change Password'
				                icon="pi pi-user-edit"
                                onClick={() => setPasswordDialog(true)}
                            ></Button>
                        </Col>
                    </Row>
                </Container>
                </Card>
            </div>
        : 
            <div className="center-page">
                <Card title="Your Information" style={{ width: '25rem', marginBottom: '2em' }} footer={footer}>
                    <p className='=m-0' style={{lineHeight: '1.5'}}>
                        Name: {userInfo.first_name} {userInfo.last_name}
                    </p>
                    <p className="m-0" style={{lineHeight: '1.5'}}>
                        Email: {userInfo.email}
                    </p>
                    <p className="m-0" style={{lineHeight: '1.5'}}>
                        Username: {userInfo.username}
                    </p>
                </Card>
            </div>
        }
            <Dialog
				className="confirmation-modal text-center"
                header="Are you sure?"
                visible={confirmationDialog}
                onHide={() => setConfirmationDialog(false)}
			>
                <Button label="Delete Account" className="p-button-danger" onClick={deleteAccount}/>
            </Dialog>

            <Dialog
                className='confirmation-modal text-center'
                header="Change Password"
                visible={passwordDialog}
                onHide={() => setPasswordDialog(false)}
            >
                <NewPassword username={username} setPasswordDialog={setPasswordDialog} />
            </Dialog>
        </div>
    )
}
