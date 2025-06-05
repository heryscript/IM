package ia.gid.IM.connector;

import ia.gid.IM.entity.Contributor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class GitLabConnector {

    @Value("${connectors.gitlab.token}")
    private String gitlabToken;

    @Value("${connectors.gitlab.url}")
    private String gitlabUrl; // ex: https://gitlab.com ou https://gitlab.monentreprise.local

    private final RestTemplate restTemplate = new RestTemplate();

    public void provision(Contributor contributor) {
        String apiUrl = gitlabUrl + "/api/v4/users";

        HttpHeaders headers = new HttpHeaders();
        headers.set("PRIVATE-TOKEN", gitlabToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();
        body.put("email", contributor.getEmail());
        body.put("username", contributor.getEmail().split("@")[0]);
        body.put("name", contributor.getLastname() + " " + contributor.getFirstname());
        body.put("password", "P@ssw0rd123"); // à adapter / générer dynamiquement
        body.put("skip_confirmation", true);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        restTemplate.postForEntity(apiUrl, request, String.class);
    }
}
