package net.newcapec.campus.h5.dao.impl;

import net.newcapec.campus.h5.dao.ProgramDao;
import net.newcapec.campus.h5.entity.Program;
import net.newcapec.campus.h5.entity.SonActivityPrizeCfg;
import net.newcapec.v3.extend.orm.hibernate.HibernateSequenceBaseDaoImpl;
import org.hibernate.SQLQuery;

import java.util.Date;

public class ProgramDaoImpl extends HibernateSequenceBaseDaoImpl<Program>
        implements ProgramDao {
    /**
     * 票加1（原来的基础上+1）
     */
    public void updateCount(Long id) {
        SQLQuery sqlQuery = this
                .getSessionFactory()
                .getCurrentSession()
                .createSQLQuery(
                        "update PROGRAM_ t set t.COUNT_=(t.COUNT_+1)  where t.ID_=?");
        sqlQuery.setLong(0, id);
        sqlQuery.executeUpdate();
    }
}
