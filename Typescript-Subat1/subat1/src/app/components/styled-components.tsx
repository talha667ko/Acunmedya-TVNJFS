import styles from './styled-component.module.css';

interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    address?: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    };
    phone?: string;
    website?: string;
    company?: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
}

export default function StyledComponents({ user }: { user: User }) {
    return (
        <div className={styles.bigWrap}>
            <p className={styles.title}>User Data</p>
            <p className={styles.data}>ID: {user?.id}</p>
            <p className={styles.data}>Name: {user?.name}</p>
            <p className={styles.data}>Username: {user?.username}</p>
            <p className={styles.data}>Email: {user?.email}</p>
            <p className={styles.data}>Street: {user?.address?.street}</p>
            <p className={styles.data}>Suite: {user?.address?.suite}</p>
            <p className={styles.data}>City: {user?.address?.city}</p>
            <p className={styles.data}>Zipcode: {user?.address?.zipcode}</p>
            <p className={styles.data}>Lat: {user?.address?.geo?.lat}</p>
            <p className={styles.data}>Lng: {user?.address?.geo?.lng}</p>
            <p className={styles.data}>Phone: {user?.phone}</p>
            <p className={styles.data}>Website: {user?.website}</p>
            <p className={styles.data}>Company Name: {user?.company?.name}</p>
            <p className={styles.data}>Catch Phrase: {user?.company?.catchPhrase}</p>
            <p className={styles.data}>BS: {user?.company?.bs}</p>
        </div>
    )
}