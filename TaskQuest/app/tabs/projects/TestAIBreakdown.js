import React from 'react';
import { View } from 'react-native';
import TaskBreakdownScreen from './AIBreakdown';

// Mock data for testing
const MOCK_DATA = {
  tasks: [
    {
      "title": "Research sustainability frameworks",
      "description": "Review major sustainability reporting frameworks like GRI, SASB, and TCFD"
    },
    {
      "title": "Analyze current practices",
      "description": "Examine how companies currently implement sustainability in accounting"
    },
    {
      "title": "Identify key metrics",
      "description": "List important sustainability metrics and KPIs for accounting"
    }
  ],
  prompt: "Create a sustainability report",
  projectId: "test-project-123"
};

export default function TestAIBreakdown() {
  return (
    <View style={{ flex: 1 }}>
      <TaskBreakdownScreen 
        tasks={MOCK_DATA.tasks}
        prompt={MOCK_DATA.prompt}
        projectId={MOCK_DATA.projectId}
        onClose={() => console.log('Close clicked')}
        onCancel={() => console.log('Cancel clicked')}
      />
    </View>
  );
} 