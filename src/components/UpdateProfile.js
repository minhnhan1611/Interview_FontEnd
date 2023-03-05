import React, { useRef, useState } from 'react';
import styles from './Profile.module.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {

    const emailRef = useRef();
    const {
        currentUser,
        cancel,
        updateUserEmail,
    } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const promises = []
        setLoading(true);
        setError("");

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateUserEmail(emailRef.current.value));
        }


        Promise.all(promises)
            .then(() => {
                alert("Update Profile Success");
            }).catch(() => {
                setError("Faied to update profile");
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const handleCancel = async () => {
        setError("");
        try {
            await cancel();
            navigate("/login");
        } catch {
            setError("Failed to log out");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h3>Profile</h3>
                {error && <div style={{ width: "100%", height: 30, backgroundColor: "#dc3545", textAlign: 'center' }}>
                    {error}
                </div>}
                <form onSubmit={handleSubmit}>
                    <strong className={styles.label_Profile}>Full name:</strong>
                    <br />
                    <input className={styles.input_Profile} type="name" defaultValue={currentUser?.name} />

                    <br />
                    <strong className={styles.label_Profile}>Day of Birth:</strong><br />
                    <input className={styles.input_Profile} type="date" defaultValue={currentUser?.date} />

                    <br />
                    <strong ref={emailRef} className={styles.label_Profile}>Email:</strong>
                    <br />
                    <input className={styles.input_Profile} type="email" defaultValue={currentUser?.email} />

                    <br />
                    <strong className={styles.label_Profile}>Phone:</strong>
                    <br />
                    <input className={styles.input_Profile} type="text" defaultValue={currentUser?.phone} />
                    <div className={styles.update_info}>
                        <button className={styles.updateBtn}>Update</button>
                        <button onClick={handleCancel} className={styles.cancelBtn}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile;
