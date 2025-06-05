package ia.gid.IM.service;

import ia.gid.IM.entity.Contributor;
import ia.gid.IM.entity.User;
import ia.gid.IM.repository.ContributorRepository;
import ia.gid.IM.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ContributorService {
    private final ContributorRepository contributorRepository;
    private final UserRepository userRepository;

    public List<Contributor> getContributorsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        return contributorRepository.findByUser(user);
    }


    public List<Contributor> findAll() {
        return contributorRepository.findAll();
    }

    public Contributor findById(Long id) {
        return contributorRepository.findById(id).orElseThrow();
    }

    public Contributor save(Contributor contributor) {
        return contributorRepository.save(contributor);
    }

    public Contributor update( Long contributorId,Contributor contributor) {
        Contributor contributorToUpdate = contributorRepository.findById(contributorId).orElseThrow();
        contributorToUpdate.setFirstname(contributor.getFirstname());
        contributorToUpdate.setLastname(contributor.getLastname());
        contributorToUpdate.setEmail(contributor.getEmail());
        contributorToUpdate.setFunction(contributor.getFunction());
        contributorToUpdate.setOrganisation(contributor.getOrganisation());
        return contributorRepository.save(contributorToUpdate);
    }

    public void delete(Long contributorId) {
        Optional<Contributor> contributor = contributorRepository.findById(contributorId);
        if (contributor.isPresent()) {
            contributorRepository.deleteById(contributorId);
        }
    }
}
