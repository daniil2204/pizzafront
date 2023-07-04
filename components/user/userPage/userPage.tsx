import styles from "./userPage.module.scss";

const UserPage = () => {
    return(
        <div className={styles.userPage}>
            <p>Особиста інформація</p>
            <div>
                <p>Ім'я - </p>
                <p>Побатькові - </p>
                <p>Прізвище - </p>
                <p>Почтова скринька - </p>
            </div>
        </div>
    )
};

export default UserPage;