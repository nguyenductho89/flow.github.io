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
        '🎯 <span class="note-action">Collaborated</span> with <span class="note-subject">stakeholders</span> to clarify <span class="note-object">requirements</span> and <span class="note-result">business goals</span>',
        '🔍 <span class="note-action">Detected</span> <span class="note-object">technical concerns</span> and <span class="note-object">business logic</span> that <span class="note-result">affect old features</span>',
        '📊 <span class="note-action">Provided</span> <span class="note-object">detailed estimation</span> for <span class="note-result">project planning</span>'
      ],
      phase: 'requirements',
      next: ['req-architecture']
    },
    {
      id: 'req-architecture',
      title: 'Architecture Planning',
      notes: [
        '🏗️ <span class="note-action">Designed</span> <span class="note-object">system architecture</span> for <span class="note-result">modular flow</span>',
        '🔄 <span class="note-action">Evaluated</span> <span class="note-object">impact on existing systems</span> for <span class="note-result">seamless integration</span>',
        '📐 <span class="note-action">Applied</span> <span class="note-object">design patterns</span> for <span class="note-result">scalability</span>'
      ],
      phase: 'requirements',
      next: ['dev-implementation']
    },
    {
      id: 'dev-implementation',
      title: 'Code Implementation',
      notes: [
        '📱 <span class="note-action">Built</span> <span class="note-object">iOS apps</span> using <span class="note-subject">Swift/SwiftUI</span>',
        '📦 <span class="note-action">Created</span> <span class="note-object">reusable libraries</span> for <span class="note-result">efficiency</span>',
        '🔄 <span class="note-action">Integrated</span> <span class="note-object">APIs</span> with <span class="note-result">optimized performance</span>'
      ],
      phase: 'development',
      next: ['dev-version-control']
    },
    {
      id: 'dev-version-control',
      title: 'Version Control',
      notes: [
        '🌿 <span class="note-action">Maintained</span> <span class="note-object">Git branching strategy</span>',
        '👀 <span class="note-action">Conducted</span> <span class="note-object">code reviews</span> for <span class="note-result">quality assurance</span>',
        '🔄 <span class="note-action">Implemented</span> <span class="note-object">CI/CD builds</span>'
      ],
      phase: 'development',
      next: ['dev-code-review']
    },
    {
      id: 'dev-code-review',
      title: 'Code Review and Mentorship',
      notes: [
        '📋 <span class="note-action">Enforced</span> <span class="note-object">coding standards</span> for <span class="note-result">consistency</span>',
        '🎓 <span class="note-action">Mentored</span> <span class="note-subject">junior developers</span>',
        '⚡ <span class="note-action">Improved</span> <span class="note-object">team efficiency</span> and <span class="note-result">code quality</span>'
      ],
      phase: 'development',
      next: ['test-unit']
    },
    {
      id: 'test-unit',
      title: 'Unit Testing',
      notes: [
        '🎯 <span class="note-action">Implemented</span> <span class="note-object">XCTest coverage</span>',
        '🔄 <span class="note-action">Created</span> <span class="note-object">API mocks</span> for <span class="note-result">edge cases</span>'
      ],
      phase: 'testing',
      next: ['test-ui', 'test-manual']
    },
    {
      id: 'test-ui',
      title: 'UI Testing',
      notes: [
        '🤖 <span class="note-action">Automated</span> <span class="note-object">UI tests</span> with <span class="note-subject">XCUITest</span>',
        '📱 <span class="note-action">Verified</span> <span class="note-object">cross-device compatibility</span>'
      ],
      phase: 'testing',
      next: ['cicd-build']
    },
    {
      id: 'test-manual',
      title: 'Manual Testing',
      notes: [
        '🔍 <span class="note-action">Conducted</span> <span class="note-object">functional testing</span>',
        '✅ <span class="note-action">Validated</span> <span class="note-object">client requirements</span>'
      ],
      phase: 'testing',
      next: ['cicd-build']
    },
    {
      id: 'cicd-build',
      title: 'Build Configuration',
      notes: [
        '⚙️ <span class="note-action">Configured</span> <span class="note-object">Xcode settings</span>',
        '🔐 <span class="note-action">Managed</span> <span class="note-object">signing certificates</span>'
      ],
      phase: 'cicd',
      next: ['cicd-automated']
    },
    {
      id: 'cicd-automated',
      title: 'Automated Build',
      notes: [
        '🚀 <span class="note-action">Integrated</span> <span class="note-subject">Fastlane</span> for <span class="note-result">automation</span>',
        '📲 <span class="note-action">Deployed</span> to <span class="note-object">TestFlight</span> and <span class="note-object">DeployGate</span>'
      ],
      phase: 'cicd',
      next: ['cicd-tests-check']
    },
    {
      id: 'cicd-tests-check',
      title: 'All Tests Passed?',
      notes: [],
      phase: 'cicd',
      next: ['cicd-fix-issues', 'cicd-version-tagging']
    },
    {
      id: 'cicd-fix-issues',
      title: 'Fix Issues',
      notes: [
        '🔧 <span class="note-action">Debugged</span> <span class="note-object">test failures</span>',
        '🔄 <span class="note-action">Conducted</span> <span class="note-object">regression tests</span> for <span class="note-result">validation</span>'
      ],
      phase: 'cicd',
      next: ['cicd-automated'],
      status: 'error'
    },
    {
      id: 'cicd-version-tagging',
      title: 'Version Tagging',
      notes: [
        '🏷️ <span class="note-action">Applied</span> <span class="note-object">semantic versioning</span>',
        '📌 <span class="note-action">Created</span> <span class="note-object">Git tags</span> for <span class="note-result">release tracking</span>'
      ],
      phase: 'cicd',
      next: ['cicd-upload'],
      status: 'success'
    },
    {
      id: 'cicd-upload',
      title: 'App Store Upload',
      notes: [
        '📤 <span class="note-action">Managed</span> <span class="note-object">App Store Connect</span> <span class="note-result">submissions</span>',
        '🧪 <span class="note-action">Prepared</span> <span class="note-object">TestFlight builds</span> for <span class="note-result">QA testing</span>'
      ],
      phase: 'cicd',
      next: ['cicd-review-check']
    },
    {
      id: 'cicd-review-check',
      title: 'App Store Review',
      notes: [],
      phase: 'cicd',
      next: ['cicd-address-feedback', 'cicd-release']
    },
    {
      id: 'cicd-address-feedback',
      title: 'Address Feedback',
      notes: [
        '📋 <span class="note-action">Reviewed</span> <span class="note-object">App Store guidelines</span>',
        '✅ <span class="note-action">Resolved</span> <span class="note-object">violations</span> for <span class="note-result">resubmission</span>'
      ],
      phase: 'cicd',
      next: ['cicd-upload'],
      status: 'error'
    },
    {
      id: 'cicd-release',
      title: 'Release to App Store',
      notes: [
        '📊 <span class="note-action">Monitored</span> <span class="note-object">analytics</span> and <span class="note-object">crash reports</span>',
        '🚀 <span class="note-action">Ensured</span> <span class="note-object">app quality</span> <span class="note-result">post-release</span>'
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
      
      node.next.forEach((nextId, index) => {
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
          const arrowLength = 8;
          const adjustedEndY = endY + arrowLength;

          // Calculate vertical spacing
          const verticalGap = 60; // Increased gap between nodes
          const horizontalGap = 100; // Base horizontal gap

          // Special handling for different connection types
          let path = '';
          let status = node.status;

          // Parallel paths from test-unit to test-ui and test-manual
          if (node.id === 'test-unit') {
            const offset = index === 0 ? -200 : 200;
            const midY = startY + (adjustedEndY - startY) / 3;
            path = `
              M ${startX} ${startY}
              L ${startX} ${startY + verticalGap}
              L ${endX} ${startY + verticalGap}
              L ${endX} ${adjustedEndY}
            `;
          }
          // Paths from parallel tests to cicd-build
          else if (node.id === 'test-ui' || node.id === 'test-manual') {
            const offset = node.id === 'test-ui' ? -horizontalGap : horizontalGap;
            const midY = startY + (adjustedEndY - startY) / 2;
            path = `
              M ${startX} ${startY}
              L ${startX} ${startY + verticalGap}
              L ${startX + offset} ${startY + verticalGap}
              L ${startX + offset} ${midY}
              L ${endX} ${midY}
              L ${endX} ${adjustedEndY}
            `;
          }
          // Decision points in CI/CD pipeline
          else if (node.id === 'cicd-tests-check' || node.id === 'cicd-review-check') {
            const offset = index === 0 ? -horizontalGap * 2 : horizontalGap * 2;
            const midY = startY + (adjustedEndY - startY) / 2;
            path = `
              M ${startX} ${startY}
              L ${startX} ${startY + verticalGap}
              L ${startX + offset} ${startY + verticalGap}
              L ${startX + offset} ${midY}
              L ${endX} ${midY}
              L ${endX} ${adjustedEndY}
            `;
            status = nextId.includes('fix') || nextId.includes('feedback') ? 'error' : 'success';
          }
          // Feedback loops (fix-issues to automated, address-feedback to upload)
          else if (node.id === 'cicd-fix-issues' || node.id === 'cicd-address-feedback') {
            const controlPointOffset = horizontalGap * 3;
            path = `
              M ${startX} ${startY}
              L ${startX} ${startY + verticalGap}
              L ${startX - controlPointOffset} ${startY + verticalGap}
              L ${startX - controlPointOffset} ${adjustedEndY - verticalGap}
              L ${endX} ${adjustedEndY - verticalGap}
              L ${endX} ${adjustedEndY}
            `;
            status = 'error';
          }
          // Standard vertical paths
          else {
            const midY = startY + (adjustedEndY - startY) / 2;
            const xDiff = endX - startX;
            const xOffset = xDiff !== 0 ? Math.sign(xDiff) * horizontalGap : 0;
            
            path = `
              M ${startX} ${startY}
              L ${startX} ${startY + verticalGap}
              ${xDiff !== 0 ? `L ${startX + xOffset} ${startY + verticalGap}` : ''}
              ${xDiff !== 0 ? `L ${startX + xOffset} ${midY}` : `L ${startX} ${midY}`}
              L ${endX} ${midY}
              L ${endX} ${adjustedEndY}
            `;
          }

          connections.push({
            path: path.trim(),
            status
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

<div class="min-h-screen p-4">
  <h1 class="text-3xl font-bold text-center mb-8 text-border">Development Workflow</h1>
  
  <div class="max-w-[90vw] mx-auto overflow-visible">
    <div 
      class="flow-container relative grid gap-16 justify-items-center"
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
      <div class="phase-container w-full" data-phase="requirements">
        <h2 class="phase-title" data-phase="requirements">Requirements Phase</h2>
        <div class="grid gap-16 justify-items-center">
          <div class="flow-node w-full max-w-2xl" data-phase="requirements" bind:this={nodes['req-gathering']}>
            <Card class="!bg-transparent !border-0 !shadow-none !p-0">
              <h3 class="text-xl font-semibold mb-3">{flowNodes.find(n => n.id === 'req-gathering')?.title}</h3>
              <ul class="space-y-2">
                {#each flowNodes.find(n => n.id === 'req-gathering')?.notes || [] as note}
                  <li class="note-text">{@html note}</li>
                {/each}
              </ul>
            </Card>
          </div>

          <div class="flow-node w-full max-w-2xl" data-phase="requirements" bind:this={nodes['req-architecture']}>
            <Card class="!bg-transparent !border-0 !shadow-none !p-0">
              <h3 class="text-xl font-semibold mb-3">{flowNodes.find(n => n.id === 'req-architecture')?.title}</h3>
              <ul class="space-y-2">
                {#each flowNodes.find(n => n.id === 'req-architecture')?.notes || [] as note}
                  <li class="note-text">{@html note}</li>
                {/each}
              </ul>
            </Card>
          </div>
        </div>
      </div>

      <!-- Development Phase -->
      <div class="phase-container w-full" data-phase="development">
        <h2 class="phase-title" data-phase="development">Development Phase</h2>
        <div class="grid gap-16 justify-items-center">
          <div class="flow-node w-full max-w-2xl" data-phase="development" bind:this={nodes['dev-implementation']}>
            <Card class="!bg-transparent !border-0 !shadow-none !p-0">
              <h3 class="text-xl font-semibold mb-3">{flowNodes.find(n => n.id === 'dev-implementation')?.title}</h3>
              <ul class="space-y-2">
                {#each flowNodes.find(n => n.id === 'dev-implementation')?.notes || [] as note}
                  <li class="note-text">{@html note}</li>
                {/each}
              </ul>
            </Card>
          </div>

          <div class="flow-node w-full max-w-2xl" data-phase="development" bind:this={nodes['dev-version-control']}>
            <Card class="!bg-transparent !border-0 !shadow-none !p-0">
              <h3 class="text-xl font-semibold mb-3">{flowNodes.find(n => n.id === 'dev-version-control')?.title}</h3>
              <ul class="space-y-2">
                {#each flowNodes.find(n => n.id === 'dev-version-control')?.notes || [] as note}
                  <li class="note-text">{@html note}</li>
                {/each}
              </ul>
            </Card>
          </div>

          <div class="flow-node w-full max-w-2xl" data-phase="development" bind:this={nodes['dev-code-review']}>
            <Card class="!bg-transparent !border-0 !shadow-none !p-0">
              <h3 class="text-xl font-semibold mb-3">{flowNodes.find(n => n.id === 'dev-code-review')?.title}</h3>
              <ul class="space-y-2">
                {#each flowNodes.find(n => n.id === 'dev-code-review')?.notes || [] as note}
                  <li class="note-text">{@html note}</li>
                {/each}
              </ul>
            </Card>
          </div>
        </div>
      </div>

      <!-- Testing Phase -->
      <div class="phase-container w-full" data-phase="testing">
        <h2 class="phase-title" data-phase="testing">Testing Phase</h2>
        <div class="grid gap-16 justify-items-center">
          <div class="flow-node w-full max-w-2xl" data-phase="testing" bind:this={nodes['test-unit']}>
            <Card class="!bg-transparent !border-0 !shadow-none !p-0">
              <h3 class="text-xl font-semibold mb-3">{flowNodes.find(n => n.id === 'test-unit')?.title}</h3>
              <ul class="space-y-2">
                {#each flowNodes.find(n => n.id === 'test-unit')?.notes || [] as note}
                  <li class="note-text">{@html note}</li>
                {/each}
              </ul>
            </Card>
          </div>

          <!-- Parallel Testing -->
          <div class="grid grid-cols-2 gap-12 w-full max-w-4xl">
            <div class="flow-node" data-phase="testing" bind:this={nodes['test-ui']}>
              <Card class="!bg-transparent !border-0 !shadow-none !p-0">
                <h3 class="text-xl font-semibold mb-3">{flowNodes.find(n => n.id === 'test-ui')?.title}</h3>
                <ul class="space-y-2">
                  {#each flowNodes.find(n => n.id === 'test-ui')?.notes || [] as note}
                    <li class="note-text">{@html note}</li>
                  {/each}
                </ul>
              </Card>
            </div>

            <div class="flow-node" data-phase="testing" bind:this={nodes['test-manual']}>
              <Card class="!bg-transparent !border-0 !shadow-none !p-0">
                <h3 class="text-xl font-semibold mb-3">{flowNodes.find(n => n.id === 'test-manual')?.title}</h3>
                <ul class="space-y-2">
                  {#each flowNodes.find(n => n.id === 'test-manual')?.notes || [] as note}
                    <li class="note-text">{@html note}</li>
                  {/each}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <!-- CI/CD Pipeline -->
      <div class="phase-container w-full" data-phase="cicd">
        <h2 class="phase-title" data-phase="cicd">CI/CD Pipeline</h2>
        <div class="grid gap-16 justify-items-center">
          <div class="flow-node w-full max-w-2xl" data-phase="cicd" bind:this={nodes['cicd-build']}>
            <Card class="!bg-transparent !border-0 !shadow-none !p-0">
              <h3 class="text-xl font-semibold mb-3">{flowNodes.find(n => n.id === 'cicd-build')?.title}</h3>
              <ul class="space-y-2">
                {#each flowNodes.find(n => n.id === 'cicd-build')?.notes || [] as note}
                  <li class="note-text">{@html note}</li>
                {/each}
              </ul>
            </Card>
          </div>

          <div class="flow-node w-full max-w-2xl" data-phase="cicd" bind:this={nodes['cicd-automated']}>
            <Card class="!bg-transparent !border-0 !shadow-none !p-0">
              <h3 class="text-xl font-semibold mb-3">{flowNodes.find(n => n.id === 'cicd-automated')?.title}</h3>
              <ul class="space-y-2">
                {#each flowNodes.find(n => n.id === 'cicd-automated')?.notes || [] as note}
                  <li class="note-text">{@html note}</li>
                {/each}
              </ul>
            </Card>
          </div>

          <!-- Tests Check Decision -->
          <div class="flow-node w-64" data-phase="cicd" data-type="decision" bind:this={nodes['cicd-tests-check']}>
            <Card class="!bg-transparent !border-0 !shadow-none !p-0 text-center">
              <h3 class="text-xl font-semibold mb-3">{flowNodes.find(n => n.id === 'cicd-tests-check')?.title}</h3>
              <div class="flex justify-around mt-4">
                <span class="text-error">No</span>
                <span class="text-success">Yes</span>
              </div>
            </Card>
          </div>

          <div class="grid grid-cols-2 gap-12 w-full max-w-4xl">
            <!-- Left path (Fix Issues) -->
            <div class="flow-node" data-phase="cicd" bind:this={nodes['cicd-fix-issues']}>
              <Card class="!bg-transparent !border-0 !shadow-none !p-0">
                <h3 class="text-xl font-semibold mb-3">{flowNodes.find(n => n.id === 'cicd-fix-issues')?.title}</h3>
                <ul class="space-y-2">
                  {#each flowNodes.find(n => n.id === 'cicd-fix-issues')?.notes || [] as note}
                    <li class="note-text">{@html note}</li>
                  {/each}
                </ul>
              </Card>
            </div>

            <div class="flow-node" data-phase="cicd" bind:this={nodes['cicd-version-tagging']}>
              <Card class="!bg-transparent !border-0 !shadow-none !p-0">
                <h3 class="text-xl font-semibold mb-3">{flowNodes.find(n => n.id === 'cicd-version-tagging')?.title}</h3>
                <ul class="space-y-2">
                  {#each flowNodes.find(n => n.id === 'cicd-version-tagging')?.notes || [] as note}
                    <li class="note-text">{@html note}</li>
                  {/each}
                </ul>
              </Card>
            </div>
          </div>

          <!-- App Store Upload -->
          <div class="flow-node w-full max-w-2xl" data-phase="cicd" bind:this={nodes['cicd-upload']}>
            <Card class="!bg-transparent !border-0 !shadow-none !p-0">
              <h3 class="text-xl font-semibold mb-3">{flowNodes.find(n => n.id === 'cicd-upload')?.title}</h3>
              <ul class="space-y-2">
                {#each flowNodes.find(n => n.id === 'cicd-upload')?.notes || [] as note}
                  <li class="note-text">{@html note}</li>
                {/each}
              </ul>
            </Card>
          </div>

          <!-- Review Decision -->
          <div class="flow-node w-64" data-phase="cicd" data-type="decision" bind:this={nodes['cicd-review-check']}>
            <Card class="!bg-transparent !border-0 !shadow-none !p-0 text-center">
              <h3 class="text-xl font-semibold mb-3">{flowNodes.find(n => n.id === 'cicd-review-check')?.title}</h3>
              <div class="flex justify-around mt-4">
                <span class="text-error">Rejected</span>
                <span class="text-success">Approved</span>
              </div>
            </Card>
          </div>

          <div class="grid grid-cols-2 gap-12 w-full max-w-4xl">
            <!-- Left path (Address Feedback) -->
            <div class="flow-node" data-phase="cicd" bind:this={nodes['cicd-address-feedback']}>
              <Card class="!bg-transparent !border-0 !shadow-none !p-0">
                <h3 class="text-xl font-semibold mb-3">{flowNodes.find(n => n.id === 'cicd-address-feedback')?.title}</h3>
                <ul class="space-y-2">
                  {#each flowNodes.find(n => n.id === 'cicd-address-feedback')?.notes || [] as note}
                    <li class="note-text">{@html note}</li>
                  {/each}
                </ul>
              </Card>
            </div>

            <div class="flow-node" data-phase="cicd" bind:this={nodes['cicd-release']}>
              <Card class="!bg-transparent !border-0 !shadow-none !p-0">
                <h3 class="text-xl font-semibold mb-3">{flowNodes.find(n => n.id === 'cicd-release')?.title}</h3>
                <ul class="space-y-2">
                  {#each flowNodes.find(n => n.id === 'cicd-release')?.notes || [] as note}
                    <li class="note-text">{@html note}</li>
                  {/each}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
