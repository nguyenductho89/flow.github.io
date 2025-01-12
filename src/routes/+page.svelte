<script lang="ts">
  import { Card } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import '../app.css';

  interface FlowNode {
    title: string;
    notes: string[];
    phase: 'requirements' | 'development' | 'testing' | 'cicd';
    id: string;
    next?: string[];
    status?: 'success' | 'error';
  }

  let nodes: { [key: string]: HTMLElement } = {};
  let mounted = false;
  let container: HTMLElement;
  let connections: { path: string; status?: 'success' | 'error' }[] = [];

  const flowNodes: FlowNode[] = [
    {
      id: 'req-gathering',
      title: 'Requirements Gathering',
      notes: [
        'Defined product requirements',
        'Collaborated with stakeholders to clarify goals',
        'Provided detailed effort estimation'
      ],
      phase: 'requirements',
      next: ['req-architecture']
    },
    {
      id: 'req-architecture',
      title: 'Architecture Planning',
      notes: [
        'System design (data flow and modular architecture)',
        'Technology stack selection',
        'Applied design patterns for scalability'
      ],
      phase: 'requirements',
      next: ['dev-implementation']
    },
    {
      id: 'dev-implementation',
      title: 'Code Implementation',
      notes: [
        'Swift/SwiftUI for iOS apps',
        'Implemented reusable libraries',
        'Integrated APIs and optimized performance'
      ],
      phase: 'development',
      next: ['dev-version-control']
    },
    {
      id: 'dev-version-control',
      title: 'Version Control',
      notes: [
        'Maintained Git branching strategy',
        'Conducted thorough code reviews for pull requests',
        'Used CI/CD for automated builds'
      ],
      phase: 'development',
      next: ['dev-code-review']
    },
    {
      id: 'dev-code-review',
      title: 'Code Review and Mentorship',
      notes: [
        'Enforced coding standards',
        'Provided mentorship to junior developers',
        'Improved team efficiency and code quality'
      ],
      phase: 'development',
      next: ['test-unit']
    },
    {
      id: 'test-unit',
      title: 'Unit Testing',
      notes: [
        'XCTest for logic coverage',
        'Mocking API responses for edge cases'
      ],
      phase: 'testing',
      next: ['test-ui', 'test-manual']
    },
    {
      id: 'test-ui',
      title: 'UI Testing',
      notes: [
        'Automated tests with XCUITest',
        'Focused on usability and cross-device compatibility'
      ],
      phase: 'testing',
      next: ['cicd-build']
    },
    {
      id: 'test-manual',
      title: 'Manual Testing',
      notes: [
        'Conducted functional and regression testing',
        'Ensured alignment with client requirements'
      ],
      phase: 'testing',
      next: ['cicd-build']
    },
    {
      id: 'cicd-build',
      title: 'Build Configuration',
      notes: [
        'Configured Xcode settings and environments',
        'Handled signing certificates'
      ],
      phase: 'cicd',
      next: ['cicd-automated']
    },
    {
      id: 'cicd-automated',
      title: 'Automated Build',
      notes: [
        'Integrated Fastlane for build automation',
        'Deployed builds to TestFlight and DeployGate'
      ],
      phase: 'cicd',
      next: ['cicd-upload']
    },
    {
      id: 'cicd-upload',
      title: 'App Store Upload',
      notes: [
        'Managed App Store Connect uploads',
        'Prepared TestFlight for QA and client feedback'
      ],
      phase: 'cicd',
      status: 'success'
    }
  ];

  function updateConnections() {
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    connections = [];
    
    flowNodes.forEach(node => {
      if (!node.next) return;
      
      node.next.forEach(nextId => {
        const startNode = nodes[node.id];
        const endNode = nodes[nextId];
        
        if (startNode && endNode) {
          const startRect = startNode.getBoundingClientRect();
          const endRect = endNode.getBoundingClientRect();
          
          // Convert to relative coordinates
          const startX = startRect.left - containerRect.left + startRect.width / 2;
          const startY = startRect.bottom - containerRect.top;
          const endX = endRect.left - containerRect.left + endRect.width / 2;
          const endY = endRect.top - containerRect.top;
          
          const midY = (startY + endY) / 2;
          const path = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;
          
          connections.push({
            path,
            status: node.status
          });
        }
      });
    });
  }

  onMount(() => {
    mounted = true;
    updateConnections();
    window.addEventListener('resize', updateConnections);
    return () => window.removeEventListener('resize', updateConnections);
  });

  $: if (mounted && container) {
    updateConnections();
  }
</script>

<div class="min-h-screen bg-gray-50 p-8">
  <h1 class="text-4xl font-bold text-center mb-12 text-border">Development Workflow</h1>
  
  <div class="max-w-7xl mx-auto grid gap-8 relative" bind:this={container}>
    <svg class="absolute inset-0 w-full h-full pointer-events-none" style="min-height: 100%">
      {#each connections as conn}
        <path 
          class="flow-connector {conn.status ? `flow-connector-${conn.status}` : ''}"
          d={conn.path}
        />
      {/each}
    </svg>

    <!-- Requirements Phase -->
    <section class="flow-section bg-requirements">
      <h2 class="text-2xl font-bold mb-6 text-border">Requirements Phase</h2>
      <div class="grid gap-6">
        {#each flowNodes.filter(node => node.phase === 'requirements') as node}
          <div class="flow-node" bind:this={nodes[node.id]}>
            <Card>
              <h3 class="text-xl font-semibold mb-3">{node.title}</h3>
              <ul class="list-disc pl-5 space-y-2">
                {#each node.notes as note}
                  <li>{note}</li>
                {/each}
              </ul>
            </Card>
          </div>
        {/each}
      </div>
    </section>

    <!-- Development Phase -->
    <section class="flow-section bg-development">
      <h2 class="text-2xl font-bold mb-6 text-border">Development Phase</h2>
      <div class="grid gap-6">
        {#each flowNodes.filter(node => node.phase === 'development') as node}
          <div class="flow-node" bind:this={nodes[node.id]}>
            <Card>
              <h3 class="text-xl font-semibold mb-3">{node.title}</h3>
              <ul class="list-disc pl-5 space-y-2">
                {#each node.notes as note}
                  <li>{note}</li>
                {/each}
              </ul>
            </Card>
          </div>
        {/each}
      </div>
    </section>

    <!-- Testing Phase -->
    <section class="flow-section bg-testing">
      <h2 class="text-2xl font-bold mb-6 text-border">Testing Phase</h2>
      <div class="grid grid-cols-3 gap-6">
        {#each flowNodes.filter(node => node.phase === 'testing') as node}
          <div class="flow-node" bind:this={nodes[node.id]}>
            <Card>
              <h3 class="text-xl font-semibold mb-3">{node.title}</h3>
              <ul class="list-disc pl-5 space-y-2">
                {#each node.notes as note}
                  <li>{note}</li>
                {/each}
              </ul>
            </Card>
          </div>
        {/each}
      </div>
    </section>

    <!-- CI/CD Pipeline -->
    <section class="flow-section bg-cicd">
      <h2 class="text-2xl font-bold mb-6 text-border">CI/CD Pipeline</h2>
      <div class="grid gap-6">
        {#each flowNodes.filter(node => node.phase === 'cicd') as node}
          <div class="flow-node" bind:this={nodes[node.id]}>
            <Card>
              <h3 class="text-xl font-semibold mb-3">{node.title}</h3>
              <ul class="list-disc pl-5 space-y-2">
                {#each node.notes as note}
                  <li>{note}</li>
                {/each}
              </ul>
            </Card>
          </div>
        {/each}
      </div>
    </section>
  </div>
</div>
