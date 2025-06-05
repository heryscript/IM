package ia.gid.IM.controller;

import ia.gid.IM.entity.Contributor;
import ia.gid.IM.service.ContributorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/contributors")
public class ContributorController {
    private final ContributorService contributorService;

    @GetMapping
    public List<Contributor> contributors() {
        return contributorService.findAll();
    }

    @GetMapping("{contributorId}")
    public Contributor contributor(@PathVariable("contributorId") long contributorId) {
        return contributorService.findById(contributorId);
    }

    @PostMapping
    public Contributor createContributor(@RequestBody Contributor contributor) {
        return contributorService.save(contributor);
    }

    @PutMapping("{contributorId}")
    public Contributor updateContributor(@PathVariable("contributorId") long contributorId, @RequestBody Contributor contributor) {
        return contributorService.update(contributorId, contributor);
    }

    @DeleteMapping("{contributorId}")
    public void deleteContributor(@PathVariable("contributorId") long contributorId) {
        contributorService.delete(contributorId);
    }
}
