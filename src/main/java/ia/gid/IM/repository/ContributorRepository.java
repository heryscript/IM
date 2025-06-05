package ia.gid.IM.repository;

import ia.gid.IM.entity.Contributor;
import ia.gid.IM.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContributorRepository extends JpaRepository<Contributor, Long> {
    List<Contributor> findByUser(User user);
}
