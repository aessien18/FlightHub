"use client"

import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React, { useState } from "react"
import { SafeAreaView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View, Modal, FlatList, ActivityIndicator, Alert, Platform } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Calendar from 'expo-calendar';
 

export default function CalendarSyncScreen() {
  const router = useRouter();
  const [importFlightsEnabled, setImportFlightsEnabled] = useState(false);
  const [exportFlightsEnabled, setExportFlightsEnabled] = useState(false);
  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'import' | 'export' | null>(null);
  // Calendar selection state
  const [selectedImportCalendar, setSelectedImportCalendar] = useState<Calendar.Calendar | null>(null);
  const [selectedExportCalendar, setSelectedExportCalendar] = useState<Calendar.Calendar | null>(null);
  // Date range state
  const [importStartDate, setImportStartDate] = useState<Date>(new Date());
  const [importEndDate, setImportEndDate] = useState<Date>(new Date());
  const [exportStartDate, setExportStartDate] = useState<Date>(new Date());
  const [exportEndDate, setExportEndDate] = useState<Date>(new Date());

  // Modal open handler
  const openCalendarModal = (type: 'import' | 'export') => {
    setModalType(type);
    setModalVisible(true);
  };

  // Modal close handler
  const closeCalendarModal = () => {
    setModalVisible(false);
    setModalType(null);
  };

  // Reusable modal component for calendar selection and date range
  const CalendarPickerModal = ({
    visible,
    type,
    onClose,
    onSelectCalendar,
    selectedCalendar,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  }: {
    visible: boolean;
    type: 'import' | 'export';
    onClose: () => void;
    onSelectCalendar: (calendar: Calendar.Calendar) => void;
    selectedCalendar: Calendar.Calendar | null;
    startDate: Date;
    endDate: Date;
    setStartDate: (date: Date) => void;
    setEndDate: (date: Date) => void;
  }) => {
    const [calendars, setCalendars] = useState<Calendar.Calendar[]>([]);
    const [loading, setLoading] = useState(false);
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    // Load calendars when modal opens
    React.useEffect(() => {
      if (!visible) return;
      (async () => {
        setLoading(true);
        try {
          const { status } = await Calendar.requestCalendarPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Calendar permission is required.');
            onClose();
            return;
          }
          const cals = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
          setCalendars(cals);
        } catch {
          Alert.alert('Error', 'Failed to load calendars.');
        } finally {
          setLoading(false);
        }
      })();
    }, [visible, onClose]);

    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#222', borderRadius: 12, padding: 24, width: '85%', maxHeight: '80%' }}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
              {type === 'import' ? 'Select Import Calendar' : 'Select Export Calendar'}
            </Text>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <FlatList
                data={calendars}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => onSelectCalendar(item)} style={{ paddingVertical: 12 }}>
                    <Text style={{ color: selectedCalendar?.id === item.id ? '#34C759' : '#fff', fontSize: 16 }}>{item.title}</Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={{ color: '#fff' }}>No calendars found.</Text>}
                style={{ maxHeight: 180 }}
              />
            )}
            {/* Date pickers inside modal */}
            <View style={{ marginTop: 18 }}>
              <Text style={{ color: '#8E8E93', fontSize: 14 }}>Date Range:</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <TouchableOpacity onPress={() => setShowStart(true)} style={{ marginRight: 12 }}>
                  <Text style={{ color: '#fff', fontSize: 15 }}>Start: {startDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowEnd(true)}>
                  <Text style={{ color: '#fff', fontSize: 15 }}>End: {endDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
              </View>
              {showStart && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, date) => {
                    setShowStart(false);
                    if (date) setStartDate(date);
                  }}
                />
              )}
              {showEnd && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, date) => {
                    setShowEnd(false);
                    if (date) setEndDate(date);
                  }}
                />
              )}
            </View>
            <TouchableOpacity onPress={onClose} style={{ marginTop: 16, alignSelf: 'flex-end' }}>
              <Text style={{ color: '#007AFF', fontSize: 16 }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
          <Text style={styles.backText}>Settings</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendar Sync</Text>
        <TouchableOpacity style={styles.helpButton} onPress={() => console.log("Help")}>\
          <Ionicons name="help-circle-outline" size={24} color="#8E8E93" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* PRO Banner */}
        <TouchableOpacity style={styles.proBanner} onPress={() => router.push("./flighthub-pro-screen" as any)}>
          <View style={styles.proContent}>
            <View style={styles.proLabel}>
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              <Text style={styles.proText}>PRO</Text>
            </View>
            <Text style={styles.proDescription}>
              Enjoy complimentary Flighthub Pro! Limited to one year of past flights. Upgrade to remove limit.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </TouchableOpacity>

        {/* Main Description */}
        <Text style={styles.mainTitle}>Keep your calendar accurate and flights in sync.</Text>
        <Text style={styles.mainDescription}>
          Import flights in your calendar for tracking, plus past flights. Export flights with reservation details and
          live updating to keep your calendar accurate.
        </Text>

        {/* Import Flights Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Import Flights</Text>
            <Switch
              value={importFlightsEnabled}
              onValueChange={setImportFlightsEnabled}
              trackColor={{ false: "#3A3A3C", true: "#34C759" }}
              thumbColor="#FFFFFF"
            />
          </View>
          <TouchableOpacity
            style={[styles.optionRow, !importFlightsEnabled && styles.disabledOption]}
            onPress={importFlightsEnabled ? () => openCalendarModal('import') : undefined}
            disabled={!importFlightsEnabled}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="calendar" size={24} color={importFlightsEnabled ? "#FFFFFF" : "#8E8E93"} />
              <Text style={[styles.optionTitle, !importFlightsEnabled && styles.disabledText]}>Choose Calendars</Text>
            </View>
            <View style={styles.optionRight}>
              <Text style={[styles.selectText, !importFlightsEnabled && styles.disabledText]}>
                {selectedImportCalendar ? selectedImportCalendar.title : 'Select'}
              </Text>
              <Ionicons name="chevron-forward" size={16} color={importFlightsEnabled ? "#8E8E93" : "#48484A"} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Export Flights Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Export Flights</Text>
            <Switch
              value={exportFlightsEnabled}
              onValueChange={setExportFlightsEnabled}
              trackColor={{ false: "#3A3A3C", true: "#34C759" }}
              thumbColor="#FFFFFF"
            />
          </View>
          <TouchableOpacity
            style={[styles.optionRow, !exportFlightsEnabled && styles.disabledOption]}
            onPress={exportFlightsEnabled ? () => openCalendarModal('export') : undefined}
            disabled={!exportFlightsEnabled}
          >
            <View style={styles.optionLeft}>
              <Ionicons name="calendar-outline" size={24} color={exportFlightsEnabled ? "#FFFFFF" : "#8E8E93"} />
              <Text style={[styles.optionTitle, !exportFlightsEnabled && styles.disabledText]}>Choose Calendar</Text>
            </View>
            <View style={styles.optionRight}>
              <Text style={[styles.selectText, !exportFlightsEnabled && styles.disabledText]}>
                {selectedExportCalendar ? selectedExportCalendar.title : 'Select'}
              </Text>
              <Ionicons name="chevron-forward" size={16} color={exportFlightsEnabled ? "#8E8E93" : "#48484A"} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Calendar Picker Modal (Reusable for Import/Export) */}
        <CalendarPickerModal
          visible={modalVisible && !!modalType}
          type={modalType || 'import'}
          onClose={closeCalendarModal}
          onSelectCalendar={modalType === 'import' ? setSelectedImportCalendar : setSelectedExportCalendar}
          selectedCalendar={modalType === 'import' ? selectedImportCalendar : selectedExportCalendar}
          startDate={modalType === 'import' ? importStartDate : exportStartDate}
          endDate={modalType === 'import' ? importEndDate : exportEndDate}
          setStartDate={modalType === 'import' ? setImportStartDate : setExportStartDate}
          setEndDate={modalType === 'import' ? setImportEndDate : setExportEndDate}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#007AFF",
    fontSize: 17,
    marginLeft: 4,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
  helpButton: {
    position: "absolute",
    right: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  proBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 30,
  },
  proContent: {
    flex: 1,
    paddingRight: 10,
  },
  proLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  proText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 4,
  },
  proDescription: {
    color: "#8E8E93",
    fontSize: 14,
    lineHeight: 18,
  },
  mainTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  mainDescription: {
    color: "#8E8E93",
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "500",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
  },
  disabledOption: {
    backgroundColor: "#2C2C2E",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
  },
  disabledText: {
    color: "#8E8E93",
  },
  optionRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectText: {
    color: "#8E8E93",
    fontSize: 14,
    marginRight: 4,
  },
})


// ... (styles unchanged)
