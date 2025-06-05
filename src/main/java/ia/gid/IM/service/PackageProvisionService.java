package ia.gid.IM.service;

import ia.gid.IM.entity.PackageProvision;
import ia.gid.IM.repository.PackageProvisionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PackageProvisionService {
    private final PackageProvisionRepository packageProvisionRepository;

    public List<PackageProvision> findAll() {
        return packageProvisionRepository.findAll();
    }

    public PackageProvision findById(Long id) {
        return packageProvisionRepository.findById(id).orElseThrow();
    }

    public PackageProvision save(PackageProvision packageProvision) {
        return packageProvisionRepository.save(packageProvision);
    }

    public PackageProvision update(Long packageProvisionId, PackageProvision packageProvision) {
        PackageProvision packageProvisionToUpdate = packageProvisionRepository.findById(packageProvisionId).orElseThrow();
        packageProvisionToUpdate.setNom(packageProvision.getNom());
        packageProvisionToUpdate.setConnecteurs(packageProvision.getConnecteurs());
        return packageProvisionRepository.save(packageProvisionToUpdate);
    }

    public void deleteById(Long id) {
        Optional<PackageProvision> packageProvision = packageProvisionRepository.findById(id);
        if(packageProvision.isPresent()){
            packageProvisionRepository.deleteById(id);
        }
    }
}
