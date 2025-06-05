package ia.gid.IM.connector.it;

import ia.gid.IM.entity.Contributor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;

import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class GitHubConnector {
    @Value("${connectors.github.token}")
    private String githubToken;
    private final RestTemplate restTemplate = new RestTemplate();

    public void provision(Contributor contributor) {
        String org = "your-org-name";
        String apiUrl = "https://api.github.com/orgs/" + org + "/invitations";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + githubToken);
        headers.set("Accept", "application/vnd.github.v3+json");

        Map<String, String> body = new HashMap<>();
        body.put("email", contributor.getEmail());
        body.put("role", "direct_member");

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

        restTemplate.postForEntity(apiUrl, request, String.class);
    }

    public void deprovision(Contributor contributor) {
        String org = "your-org-name";

        if (contributor.getGithubUsername() == null || contributor.getGithubUsername().isEmpty()) {
            throw new IllegalArgumentException("GitHub username is required for deprovisioning");
        }

        String apiUrl = "https://api.github.com/orgs/" + org + "/members/" + contributor.getGithubUsername();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + githubToken);
        headers.set("Accept", "application/vnd.github.v3+json");

        HttpEntity<Void> request = new HttpEntity<>(headers);

        restTemplate.exchange(apiUrl, HttpMethod.DELETE, request, Void.class);
    }
}
