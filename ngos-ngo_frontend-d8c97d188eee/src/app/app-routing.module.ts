import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'authorization', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'notification-list', loadChildren: () => import('./dashboard/notifications/notifications.module').then(m => m.NotificationsModule)},
  {path: 'projects', loadChildren: () => import('./project/add-project/add-project.module').then(m => m.AddProjectModule)},
  {path: 'member', loadChildren: () => import('./member/member.module').then(m => m.MemberModule)},
  {path: 'sponsor-company', loadChildren: () => import('./sponsorCompany/sponsor-company/sponsor-company.module').then(m => m.SponsorCompanyModule)},
   {path: 'memberDonations', loadChildren: () => import('./financial/member-donations/member-donations.module').then(m => m.MemberDonationsModule)},
  {path: 'memberPledges', loadChildren: () => import('./financial/member-pledges/member-pledges.module').then(m => m.MemberPledgesModule)},

  {path: 'organizationDonations', loadChildren: () => import('./financial/organization-donations/organization-donations.module').then(m => m.OrganizationDonationsModule)},
  {path: 'organizationPledges', loadChildren: () => import('./financial/organization-pledges/organization-pledges.module').then(m => m.OrganizationPledgesModule)},
  
  {path: 'all-Pledges', loadChildren: () => import('./financial/all-pledges/all-pledges.module').then(m => m.AllPledgesModule)},

  {path: 'all-donations', loadChildren: () => import('./financial/all-donations/all-donations.module').then(m => m.AllDonationsModule)},
  
  {path: 'digitalConnect', loadChildren: () => import('./digital-connect/digital-connect.module').then(m => m.DigitalConnectModule)},
   {path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule)},
  {path: 'magazine', loadChildren: () => import('./magazine/magazine.module').then(m => m.MagazineModule)},
  {path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
  {path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule)},
  {path: 'chapters', loadChildren: () => import('./branches/branches.module').then(m => m.BranchesModule)},
  {path: 'member-projects', loadChildren: () => import('./member-projects/member-projects.module').then(m => m.MemberProjectsModule)},
  {path: 'my-occasions', loadChildren: () => import('./my-occasions/my-occasions.module').then(m => m.MyOccasionsModule)},
  {path: 'uam', loadChildren: () => import('./uam/uam.module').then(m => m.UamModule)},
  {path: 'uam-roles', loadChildren: () => import('./uam-roels/uam-roels.module').then(m => m.UamRoelsModule)},
  {path: 'my-events', loadChildren: () => import('./member-events/member-events.module').then(m => m.MemberEventsModule)},
  {path: 'project-proposal', loadChildren: () => import('./proposals/propose-project/propose-project.module').then(m => m.ProposeProjectModule)},
  {path: 'project-request', loadChildren: () => import('./proposals/request-project/request-project.module').then(m => m.RequestProjectModule)},
  {path: 'manual-donations', loadChildren: () => import('./manual-donations/manual-donations.module').then(m => m.ManualDonationsModule)},
  {path: 'member-pledges', loadChildren: () => import('./member-pledges-list/member-pledges-list.module').then(m => m.MemberPledgesListModule)},
  {path: 'org-chart', loadChildren: () => import('./org-chart/org-chart.module').then(m => m.OrgChartModule)},
  
  { path: '', redirectTo: 'authorization', pathMatch: 'full' },
  { path: '**', redirectTo: 'authorization' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
