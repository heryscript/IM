package ia.gid.IM.service;

import ia.gid.IM.connector.it.GitHubConnector;
import ia.gid.IM.connector.it.GitLabConnector;
import ia.gid.IM.entity.Contributor;
import ia.gid.IM.repository.ContributorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProvisioningService {
    private final GitHubConnector gitHubConnector;
    private final GitLabConnector gitLabConnector;
    private final ContributorRepository contributorRepository;

    public void provisionAll(Long contributorId) throws IllegalStateException {
        Contributor contributor = contributorRepository.findById(contributorId).orElseThrow();
        Set<String> allconnectors = contributor.getPackages().stream()
                .flatMap(packageProvision -> packageProvision.getConnecteurs().stream())
                .collect(Collectors.toSet());

        for(String connector : allconnectors) {
            switch (connector.toLowerCase()){
                case "gitlab": provisionGitLab(contributorId);
                case "github": provisionGitHub(contributorId);
                default: throw new IllegalStateException("connecteur inconnue");
            }
        }
    }

    public void provisionGitHub(Long contributorId) {
        Contributor contributor = contributorRepository.findById(contributorId).orElseThrow();
        gitHubConnector.provision(contributor);
    }

    public void provisionGitLab(Long contributorId) {
        Contributor contributor = contributorRepository.findById(contributorId).orElseThrow();
        gitLabConnector.provision(contributor);
    }

    public void deprovisionAll(Long contributorId) {
        Contributor contributor = contributorRepository.findById(contributorId).orElseThrow();
        Set<String> allConnecteurs = contributor.getPackages().stream()
                .flatMap(p -> p.getConnecteurs().stream())
                .collect(Collectors.toSet());

        for (String connector : allConnecteurs) {
            switch (connector.toLowerCase()) {
                case "github" -> gitHubConnector.deprovision(contributor);
                case "gitlab" -> gitLabConnector.deprovision(contributor);
                default -> throw new IllegalArgumentException("Connecteur inconnu: " + connector);
            }
        }
    }
}
