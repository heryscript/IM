package ia.gid.IM.controller;

import ia.gid.IM.service.ProvisioningService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/provisionings")
@RequiredArgsConstructor
public class ProvisioningController {
    private final ProvisioningService provisioningService;

    @PostMapping("/{contributorId}/provision/github")
    public void provisionGitHub(@PathVariable Long contributorId) {
        provisioningService.provisionGitHub(contributorId);
    }

    @PostMapping("/{contributorId}/provision/gitlab")
    public void provisionGitLab(@PathVariable Long contributorId) {
        provisioningService.provisionGitLab(contributorId);
    }
}
