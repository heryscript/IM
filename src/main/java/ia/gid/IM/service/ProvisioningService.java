package ia.gid.IM.service;

import ia.gid.IM.connector.GitHubConnector;
import ia.gid.IM.connector.GitLabConnector;
import ia.gid.IM.entity.Contributor;
import ia.gid.IM.repository.ContributorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProvisioningService {
    private final GitHubConnector gitHubConnector;
    private final GitLabConnector gitLabConnector;
    private final ContributorRepository contributorRepository;

    public void provisionAll(Long contributorId) {
        Contributor contributor = contributorRepository.findById(contributorId).orElseThrow();
        gitHubConnector.provision(contributor);
        gitLabConnector.provision(contributor);
    }

    public void provisionGitHub(Long contributorId) {
        Contributor contributor = contributorRepository.findById(contributorId).orElseThrow();
        gitHubConnector.provision(contributor);
    }

    public void provisionGitLab(Long contributorId) {
        Contributor contributor = contributorRepository.findById(contributorId).orElseThrow();
        gitLabConnector.provision(contributor);
    }
}
