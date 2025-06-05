package ia.gid.IM.repository;

import ia.gid.IM.entity.PackageProvision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PackageProvisionRepository extends JpaRepository<PackageProvision, Long> {}

