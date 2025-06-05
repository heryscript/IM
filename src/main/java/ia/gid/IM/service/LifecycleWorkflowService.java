package ia.gid.IM.service;

import ia.gid.IM.entity.Contributor;
import ia.gid.IM.entity.StatusContributor;
import ia.gid.IM.repository.ContributorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LifecycleWorkflowService {
    private final ContributorRepository contributorRepository;
    private final ProvisioningService provisioningService;

    @Scheduled(cron = "0 0 3 * * *") // chaque jours a 03;00
    public void processLifecycle(){
        LocalDate today = LocalDate.now();
        List<Contributor> contributors = contributorRepository.findAll();
        for (Contributor contributor : contributors) {
            if(contributor.getStartDate() != null && today.equals(contributor.getStartDate())){
                provisioningService.provisionAll(contributor.getId());
                contributor.setStatus(StatusContributor.ACTIF);
            }
            if(contributor.getEndDate() != null && today.equals(contributor.getEndDate())){
                provisioningService.deprovisionAll(contributor.getId());
                contributor.setStatus(StatusContributor.SORTI);
            }
            if(contributor.getStartDate() != null && today.isBefore(contributor.getStartDate())){
                provisioningService.deprovisionAll(contributor.getId());
                contributor.setStatus(StatusContributor.EN_ATTENTE);
            }
            contributorRepository.saveAll(contributors);
        }
    }

    public void processOnBoardingAndOffBoarding(){
        LocalDate today = LocalDate.now();

        List<Contributor> contributorsToOnBoard = contributorRepository.findAll().stream()
                .filter(c -> today.equals(c.getStartDate()))
                .toList();

        List<Contributor> contributorsToOffBoard = contributorRepository.findAll().stream()
                .filter(c -> today.equals(c.getEndDate()))
                .toList();

        contributorsToOnBoard.forEach(contributor -> provisioningService.provisionAll(contributor.getId()));
        contributorsToOffBoard.forEach(contributor -> provisioningService.deprovisionAll(contributor.getId()));
    }
}
