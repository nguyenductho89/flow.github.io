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
  let scale = 1;
  let minScale = 0.5;
  let maxScale = 2;

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
      next: ['cicd-tests-check']
    },
    {
      id: 'cicd-tests-check',
      title: 'All Tests Passed?',
      notes: [],
      phase: 'cicd',
      next: ['cicd-version-tagging', 'cicd-fix-issues']
    },
    {
      id: 'cicd-fix-issues',
      title: 'Fix Issues',
      notes: [
        'Debugged failures',
        'Conducted regression tests post-fix'
      ],
      phase: 'cicd',
      next: ['cicd-automated'],
      status: 'error'
    },
    {
      id: 'cicd-version-tagging',
      title: 'Version Tagging',
      notes: [
        'Applied semantic versioning',
        'Git tagging for release management'
      ],
      phase: 'cicd',
      next: ['cicd-upload'],
      status: 'success'
    },
    {
      id: 'cicd-upload',
      title: 'App Store Upload',
      notes: [
        'Managed App Store Connect uploads',
        'Prepared TestFlight for QA and client feedback'
      ],
      phase: 'cicd',
      next: ['cicd-review-check']
    },
    {
      id: 'cicd-review-check',
      title: 'App Store Review',
      notes: [],
      phase: 'cicd',
      next: ['cicd-release', 'cicd-address-feedback']
    },
    {
      id: 'cicd-address-feedback',
      title: 'Address Feedback',
      notes: [
        'Reviewed App Store guidelines',
        'Resolved violations and resubmitted'
      ],
      phase: 'cicd',
      next: ['cicd-upload'],
      status: 'error'
    },
    {
      id: 'cicd-release',
      title: 'Release to App Store',
      notes: [
        'Monitored analytics and crash reports',
        'Ensured app quality post-release'
      ],
      phase: 'cicd',
      status: 'success'
    }
  ];

  function zoomIn() {
    scale = Math.min(scale + 0.1, maxScale);
    updateConnections();
  }

  function zoomOut() {
    scale = Math.max(scale - 0.1, minScale);
    updateConnections();
  }

  function resetZoom() {
    scale = 1;
    updateConnections();
  }

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
          
          // Adjust end point to account for arrow marker
          const angle = Math.atan2(endY - startY, endX - startX);
          const arrowLength = 10;
          const adjustedEndX = endX - arrowLength * Math.cos(angle);
          const adjustedEndY = endY - arrowLength * Math.sin(angle);
          
          const midY = (startY + adjustedEndY) / 2;
          const path = `M ${startX} ${startY} C ${startX} ${midY}, ${adjustedEndX} ${midY}, ${adjustedEndX} ${adjustedEndY}`;
          
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

<div class="min-h-screen bg-gray-50/50 p-4">
  <h1 class="text-3xl font-bold text-center mb-8 text-border">Development Workflow</h1>
  
  <div class="max-w-6xl mx-auto overflow-x-auto">
    <div 
      class="flow-container"
      style="transform: scale({scale})"
      bind:this={container}
    >
      {#if mounted}
        <div class="absolute inset-0 pointer-events-none z-20">
          <svg class="w-full h-full" style="min-height: 100%">
            <!-- Arrow markers -->
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="6"
                refX="8"
                refY="3"
                orient="auto">
                <polygon points="0 0, 8 3, 0 6" class="fill-accent/60"/>
              </marker>
              <marker
                id="arrowhead-success"
                markerWidth="10"
                markerHeight="6"
                refX="8"
                refY="3"
                orient="auto">
                <polygon points="0 0, 8 3, 0 6" class="fill-success/70"/>
              </marker>
              <marker
                id="arrowhead-error"
                markerWidth="10"
                markerHeight="6"
                refX="8"
                refY="3"
                orient="auto">
                <polygon points="0 0, 8 3, 0 6" class="fill-error/70"/>
              </marker>
            </defs>
            
            {#each connections as conn}
              <path 
                class="flow-connector {conn.status ? `flow-connector-${conn.status}` : ''}"
                d={conn.path}
              />
            {/each}
          </svg>
        </div>
      {/if}

      <!-- Requirements Phase -->
      <section class="flow-section phase-requirements">
        <h2 class="text-2xl font-bold mb-8 text-border">Requirements Phase</h2>
        <div class="grid gap-12">
          <div class="flow-node" bind:this={nodes['req-gathering']}>
            <Card>
              <h3 class="text-xl font-semibold mb-3">Requirements Gathering</h3>
              <ul class="list-disc pl-5 space-y-2">
                {#each flowNodes.find(n => n.id === 'req-gathering')?.notes || [] as note}
                  <li>{note}</li>
                {/each}
              </ul>
            </Card>
          </div>

          <div class="flow-node" bind:this={nodes['req-architecture']}>
            <Card>
              <h3 class="text-xl font-semibold mb-3">Architecture Planning</h3>
              <ul class="list-disc pl-5 space-y-2">
                {#each flowNodes.find(n => n.id === 'req-architecture')?.notes || [] as note}
                  <li>{note}</li>
                {/each}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <!-- Development Phase -->
      <section class="flow-section phase-development">
        <h2 class="text-2xl font-bold mb-8 text-border">Development Phase</h2>
        <div class="grid gap-12">
          <div class="flow-node" bind:this={nodes['dev-implementation']}>
            <Card>
              <h3 class="text-xl font-semibold mb-3">Code Implementation</h3>
              <ul class="list-disc pl-5 space-y-2">
                {#each flowNodes.find(n => n.id === 'dev-implementation')?.notes || [] as note}
                  <li>{note}</li>
                {/each}
              </ul>
            </Card>
          </div>

          <div class="flow-node" bind:this={nodes['dev-version-control']}>
            <Card>
              <h3 class="text-xl font-semibold mb-3">Version Control</h3>
              <ul class="list-disc pl-5 space-y-2">
                {#each flowNodes.find(n => n.id === 'dev-version-control')?.notes || [] as note}
                  <li>{note}</li>
                {/each}
              </ul>
            </Card>
          </div>

          <div class="flow-node" bind:this={nodes['dev-code-review']}>
            <Card>
              <h3 class="text-xl font-semibold mb-3">Code Review and Mentorship</h3>
              <ul class="list-disc pl-5 space-y-2">
                {#each flowNodes.find(n => n.id === 'dev-code-review')?.notes || [] as note}
                  <li>{note}</li>
                {/each}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <!-- Testing Phase -->
      <section class="flow-section phase-testing">
        <h2 class="text-2xl font-bold mb-8 text-border">Testing Phase</h2>
        <div class="grid gap-12">
          <!-- Unit Testing -->
          <div class="flow-node" bind:this={nodes['test-unit']}>
            <Card>
              <h3 class="text-xl font-semibold mb-3">Unit Testing</h3>
              <ul class="list-disc pl-5 space-y-2">
                {#each flowNodes.find(n => n.id === 'test-unit')?.notes || [] as note}
                  <li>{note}</li>
                {/each}
              </ul>
            </Card>
          </div>

          <!-- Parallel Testing -->
          <div class="grid grid-cols-2 gap-12">
            <div class="flow-node" bind:this={nodes['test-ui']}>
              <Card>
                <h3 class="text-xl font-semibold mb-3">UI Testing</h3>
                <ul class="list-disc pl-5 space-y-2">
                  {#each flowNodes.find(n => n.id === 'test-ui')?.notes || [] as note}
                    <li>{note}</li>
                  {/each}
                </ul>
              </Card>
            </div>

            <div class="flow-node" bind:this={nodes['test-manual']}>
              <Card>
                <h3 class="text-xl font-semibold mb-3">Manual Testing</h3>
                <ul class="list-disc pl-5 space-y-2">
                  {#each flowNodes.find(n => n.id === 'test-manual')?.notes || [] as note}
                    <li>{note}</li>
                  {/each}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <!-- CI/CD Pipeline -->
      <section class="flow-section phase-cicd">
        <h2 class="text-2xl font-bold mb-8 text-border">CI/CD Pipeline</h2>
        <div class="grid gap-12">
          <!-- Build and Automated Build -->
          <div class="flow-node" bind:this={nodes['cicd-build']}>
            <Card>
              <h3 class="text-xl font-semibold mb-3">Build Configuration</h3>
              <ul class="list-disc pl-5 space-y-2">
                {#each flowNodes.find(n => n.id === 'cicd-build')?.notes || [] as note}
                  <li>{note}</li>
                {/each}
              </ul>
            </Card>
          </div>

          <div class="flow-node" bind:this={nodes['cicd-automated']}>
            <Card>
              <h3 class="text-xl font-semibold mb-3">Automated Build</h3>
              <ul class="list-disc pl-5 space-y-2">
                {#each flowNodes.find(n => n.id === 'cicd-automated')?.notes || [] as note}
                  <li>{note}</li>
                {/each}
              </ul>
            </Card>
          </div>

          <!-- Tests Check Decision -->
          <div class="grid grid-cols-3 gap-12">
            <div class="flow-node" bind:this={nodes['cicd-tests-check']}>
              <Card class="text-center">
                <h3 class="text-xl font-semibold mb-3">All Tests Passed?</h3>
                <div class="flex justify-around mt-4">
                  <span class="text-error">No</span>
                  <span class="text-success">Yes</span>
                </div>
              </Card>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-12">
            <!-- Left path (Fix Issues) -->
            <div class="flow-node" bind:this={nodes['cicd-fix-issues']}>
              <Card>
                <h3 class="text-xl font-semibold mb-3">Fix Issues</h3>
                <ul class="list-disc pl-5 space-y-2">
                  {#each flowNodes.find(n => n.id === 'cicd-fix-issues')?.notes || [] as note}
                    <li>{note}</li>
                  {/each}
                </ul>
              </Card>
            </div>

            <div class="col-start-3">
              <div class="flow-node" bind:this={nodes['cicd-version-tagging']}>
                <Card>
                  <h3 class="text-xl font-semibold mb-3">Version Tagging</h3>
                  <ul class="list-disc pl-5 space-y-2">
                    {#each flowNodes.find(n => n.id === 'cicd-version-tagging')?.notes || [] as note}
                      <li>{note}</li>
                    {/each}
                  </ul>
                </Card>
              </div>
            </div>
          </div>

          <!-- App Store Upload -->
          <div class="grid grid-cols-3 gap-12">
            <div class="col-start-2">
              <div class="flow-node" bind:this={nodes['cicd-upload']}>
                <Card>
                  <h3 class="text-xl font-semibold mb-3">App Store Upload</h3>
                  <ul class="list-disc pl-5 space-y-2">
                    {#each flowNodes.find(n => n.id === 'cicd-upload')?.notes || [] as note}
                      <li>{note}</li>
                    {/each}
                  </ul>
                </Card>
              </div>
            </div>
          </div>

          <!-- Review Decision -->
          <div class="grid grid-cols-3 gap-12">
            <div class="col-start-2">
              <div class="flow-node" bind:this={nodes['cicd-review-check']}>
                <Card class="text-center">
                  <h3 class="text-xl font-semibold mb-3">App Store Review</h3>
                  <div class="flex justify-around mt-4">
                    <span class="text-error">Rejected</span>
                    <span class="text-success">Approved</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-12">
            <!-- Left path (Address Feedback) -->
            <div class="flow-node" bind:this={nodes['cicd-address-feedback']}>
              <Card>
                <h3 class="text-xl font-semibold mb-3">Address Feedback</h3>
                <ul class="list-disc pl-5 space-y-2">
                  {#each flowNodes.find(n => n.id === 'cicd-address-feedback')?.notes || [] as note}
                    <li>{note}</li>
                  {/each}
                </ul>
              </Card>
            </div>

            <div class="col-start-3">
              <div class="flow-node" bind:this={nodes['cicd-release']}>
                <Card>
                  <h3 class="text-xl font-semibold mb-3">Release to App Store</h3>
                  <ul class="list-disc pl-5 space-y-2">
                    {#each flowNodes.find(n => n.id === 'cicd-release')?.notes || [] as note}
                      <li>{note}</li>
                    {/each}
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

  <!-- Zoom Controls -->
  <div class="zoom-controls">
    <button class="zoom-btn" on:click={zoomOut} title="Zoom Out">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
      </svg>
    </button>
    <button class="zoom-btn" on:click={resetZoom} title="Reset Zoom">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 9V7h8v6H6z" clip-rule="evenodd" />
      </svg>
    </button>
    <button class="zoom-btn" on:click={zoomIn} title="Zoom In">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</div>
