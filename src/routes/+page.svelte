<script lang="ts">
  import { Card } from 'flowbite-svelte';
  import '../app.css';

  interface FlowNode {
    title: string;
    notes: string[];
    phase: 'requirements' | 'development' | 'testing' | 'cicd';
  }

  const flowNodes: FlowNode[] = [
    {
      title: 'Requirements Gathering',
      notes: [
        'Defined product requirements',
        'Collaborated with stakeholders to clarify goals',
        'Provided detailed effort estimation'
      ],
      phase: 'requirements'
    },
    {
      title: 'Architecture Planning',
      notes: [
        'System design (data flow and modular architecture)',
        'Technology stack selection',
        'Applied design patterns for scalability'
      ],
      phase: 'requirements'
    },
    {
      title: 'Code Implementation',
      notes: [
        'Swift/SwiftUI for iOS apps',
        'Implemented reusable libraries',
        'Integrated APIs and optimized performance'
      ],
      phase: 'development'
    },
    {
      title: 'Version Control',
      notes: [
        'Maintained Git branching strategy',
        'Conducted thorough code reviews for pull requests',
        'Used CI/CD for automated builds'
      ],
      phase: 'development'
    },
    {
      title: 'Code Review and Mentorship',
      notes: [
        'Enforced coding standards',
        'Provided mentorship to junior developers',
        'Improved team efficiency and code quality'
      ],
      phase: 'development'
    },
    {
      title: 'Unit Testing',
      notes: [
        'XCTest for logic coverage',
        'Mocking API responses for edge cases'
      ],
      phase: 'testing'
    },
    {
      title: 'UI Testing',
      notes: [
        'Automated tests with XCUITest',
        'Focused on usability and cross-device compatibility'
      ],
      phase: 'testing'
    },
    {
      title: 'Manual Testing',
      notes: [
        'Conducted functional and regression testing',
        'Ensured alignment with client requirements'
      ],
      phase: 'testing'
    },
    {
      title: 'Build Configuration',
      notes: [
        'Configured Xcode settings and environments',
        'Handled signing certificates'
      ],
      phase: 'cicd'
    },
    {
      title: 'Automated Build',
      notes: [
        'Integrated Fastlane for build automation',
        'Deployed builds to TestFlight and DeployGate'
      ],
      phase: 'cicd'
    },
    {
      title: 'App Store Upload',
      notes: [
        'Managed App Store Connect uploads',
        'Prepared TestFlight for QA and client feedback'
      ],
      phase: 'cicd'
    }
  ];
</script>

<div class="min-h-screen bg-gray-50 p-8">
  <h1 class="text-4xl font-bold text-center mb-12 text-border">Development Workflow</h1>
  
  <div class="max-w-7xl mx-auto grid gap-8">
    <!-- Requirements Phase -->
    <section class="flow-section bg-requirements">
      <h2 class="text-2xl font-bold mb-6 text-border">Requirements Phase</h2>
      <div class="grid gap-6">
        {#each flowNodes.filter(node => node.phase === 'requirements') as node}
          <Card class="flow-node">
            <h3 class="text-xl font-semibold mb-3">{node.title}</h3>
            <ul class="list-disc pl-5 space-y-2">
              {#each node.notes as note}
                <li>{note}</li>
              {/each}
            </ul>
          </Card>
        {/each}
      </div>
    </section>

    <!-- Development Phase -->
    <section class="flow-section bg-development">
      <h2 class="text-2xl font-bold mb-6 text-border">Development Phase</h2>
      <div class="grid gap-6">
        {#each flowNodes.filter(node => node.phase === 'development') as node}
          <Card class="flow-node">
            <h3 class="text-xl font-semibold mb-3">{node.title}</h3>
            <ul class="list-disc pl-5 space-y-2">
              {#each node.notes as note}
                <li>{note}</li>
              {/each}
            </ul>
          </Card>
        {/each}
      </div>
    </section>

    <!-- Testing Phase -->
    <section class="flow-section bg-testing">
      <h2 class="text-2xl font-bold mb-6 text-border">Testing Phase</h2>
      <div class="grid grid-cols-3 gap-6">
        {#each flowNodes.filter(node => node.phase === 'testing') as node}
          <Card class="flow-node">
            <h3 class="text-xl font-semibold mb-3">{node.title}</h3>
            <ul class="list-disc pl-5 space-y-2">
              {#each node.notes as note}
                <li>{note}</li>
              {/each}
            </ul>
          </Card>
        {/each}
      </div>
    </section>

    <!-- CI/CD Pipeline -->
    <section class="flow-section bg-cicd">
      <h2 class="text-2xl font-bold mb-6 text-border">CI/CD Pipeline</h2>
      <div class="grid gap-6">
        {#each flowNodes.filter(node => node.phase === 'cicd') as node}
          <Card class="flow-node">
            <h3 class="text-xl font-semibold mb-3">{node.title}</h3>
            <ul class="list-disc pl-5 space-y-2">
              {#each node.notes as note}
                <li>{note}</li>
              {/each}
            </ul>
          </Card>
        {/each}
      </div>
    </section>
  </div>
</div>
