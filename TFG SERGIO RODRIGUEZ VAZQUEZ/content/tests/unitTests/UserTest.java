package test.model;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import model.Contact;
import model.User;
import util.HibernateUtil;

@SuppressWarnings({"unchecked", "rawtypes", "deprecation"})
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class UserTest {
	
	private static User _Suser = new User(false, "Peter", "Parker", "spid", "67890");
	private static Session _ShibernateSession;
	
	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		_ShibernateSession = HibernateUtil.OpenSession(false);
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
		
		String sHql = "from User where Login = '" + _Suser.getLogin() + "'";
		Query query = _ShibernateSession.createQuery(sHql);
		List<User> aUser = query.setMaxResults(1).list();
		
		if (!aUser.isEmpty()) {
			Transaction tx = _ShibernateSession.beginTransaction();
			_ShibernateSession.delete(aUser.get(0));
			tx.commit();
		}
		_ShibernateSession.close();
	}
	
	@Test
	public void t1_UserNotFound() {
		
		Session session = _ShibernateSession;
		
		String sHql = "from User where Login = '" + _Suser.getLogin() + "'";
		Query query = session.createQuery(sHql);
		List<User> aUser = query.list();
		
		Assert.assertEquals(0, aUser.size());
		Assert.assertEquals(true, aUser.isEmpty());
	}
	
	@Test
	public void t2_InsertUser() {
		
		Contact contactCheck = new Contact(_Suser, "Gwen", "First girlfriend.", 22);
		_Suser.getContacts().add(contactCheck);

		Session session = _ShibernateSession;
		
		Transaction tx = session.beginTransaction();
		// session.save(contactCheck) isn't needed, as it's configured as cascade="all" in User.hbl.xml.
		session.save(_Suser);
		tx.commit();
        
		String sHql = "from User where Login = '" + _Suser.getLogin() + "'";
		Query query = session.createQuery(sHql);
		List<User> aUser = query.list();
		
		Assert.assertEquals(1, aUser.size());
		Assert.assertEquals(_Suser, aUser.get(0));
		Assert.assertEquals(_Suser.getContacts(), aUser.get(0).getContacts());
	}
	
	@Test
	public void t3_InsertDuplicateUser() {
		
		Session session = _ShibernateSession;
		Transaction tx = null;
				
		User user = new User(_Suser.getIsSupervisor(), _Suser.getName(), 
			_Suser.getSurname(), _Suser.getLogin(), _Suser.getPassword());
		
		try {
			tx = session.beginTransaction();
			session.save(user);
			tx.commit();
		} catch(javax.persistence.PersistenceException ee) {
			SQLException eeSql = ((org.hibernate.JDBCException)ee.getCause()).getSQLException();
			Assert.assertEquals(1062, eeSql.getErrorCode());
			tx.rollback();
		} catch(Exception ee) {
			if (tx != null) tx.rollback();
		}
	}
}