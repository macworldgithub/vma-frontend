import { useState, Fragment } from "react";
import {
  Search,
  Filter,
  Download,
  Shield,
  Clock,
  Globe,
  AlertTriangle,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Avatar } from "../components/ui/Avatar";
import { mockAuditLogs } from "../data/mockData";
import type { AuditEventType } from "../types";

const typeBadge: Record<
  AuditEventType,
  { variant: "info" | "success" | "warning" | "error"; label: string }
> = {
  user_action: { variant: "info", label: "User" },
  system: { variant: "success", label: "System" },
  security: { variant: "error", label: "Security" },
  config: { variant: "warning", label: "Config" },
};

export function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<AuditEventType | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = mockAuditLogs.filter((log) => {
    const matchSearch =
      log.userName.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || log.eventType === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="p-6 space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Header with Protection Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-bold text-neutral-100">
              Audit & Compliance Trails
            </h1>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Shield size={10} className="text-emerald-400" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                Tamper Proof
              </span>
            </div>
          </div>
          <p className="text-sm text-neutral-500">
            Immutable logs of all administrative actions and system events for
            compliance auditing.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <Download size={16} /> Export Logs
          </button>
          <button className="btn-primary">Request Certification</button>
        </div>
      </div>

      {/* Retention Banner */}
      <div className="card p-4 border-blue-500/10 bg-blue-500/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-200">
              Data Retention Active
            </p>
            <p className="text-[11px] text-neutral-500">
              Logs are retained for 12 months per Patterson Cheney policy. Last
              archival: 2 hours ago.
            </p>
          </div>
        </div>
        <Badge variant="neutral">60 Days Active</Badge>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search activity, users, or IP addresses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-12 h-12 bg-neutral-900/50"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value as AuditEventType | "all")
            }
            className="input w-auto min-w-[160px] h-12"
          >
            <option value="all">All Event Types</option>
            <option value="user_action">User Actions</option>
            <option value="system">System Events</option>
            <option value="security">Security Events</option>
            <option value="config">Configuration</option>
          </select>
          <button className="btn-secondary h-12 px-6">
            <Filter size={18} /> Date Range
          </button>
        </div>
      </div>

      {/* Log List */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid rgba(51,65,85,0.25)",
                  background: "rgba(30,41,59,0.2)",
                }}
              >
                <th className="text-left text-xs font-medium text-neutral-500 px-5 py-4">
                  Timestamp
                </th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-4 hidden sm:table-cell">
                  Event Type
                </th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-4 hidden md:table-cell">
                  Actor
                </th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-4">
                  Action
                </th>
                <th className="text-left text-xs font-medium text-neutral-500 px-4 py-4 hidden xl:table-cell">
                  IP Address
                </th>
                <th className="text-right text-xs font-medium text-neutral-500 px-5 py-4">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {filtered.map((log) => {
                const b = typeBadge[log.eventType];
                const isExpanded = expandedId === log.id;

                return (
                  <Fragment key={log.id}>
                    <tr
                      className="table-row-hover group/row cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : log.id)}
                    >
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-neutral-200">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                          <span className="text-[10px] text-neutral-500 uppercase">
                            {new Date(log.timestamp).toLocaleDateString(
                              "en-AU",
                              { day: "2-digit", month: "short" },
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <Badge variant={b.variant}>{b.label}</Badge>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          {log.userName === "System" ? (
                            <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500">
                              <Shield size={14} />
                            </div>
                          ) : (
                            <Avatar name={log.userName} size="sm" />
                          )}
                          <span className="text-xs font-medium text-neutral-300">
                            {log.userName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`text-xs font-bold ${log.eventType === "security" ? "text-rose-400" : "text-neutral-200"}`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[11px] text-neutral-500 font-mono hidden xl:table-cell">
                        {log.ipAddress}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <ChevronDown
                          size={16}
                          className={`text-neutral-600 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr className="bg-neutral-900/50">
                        <td colSpan={6} className="px-8 py-6 animate-slide-in">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                              <div>
                                <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest mb-1">
                                  Detailed Event Description
                                </p>
                                <p className="text-sm text-neutral-300 leading-relaxed">
                                  {log.details}
                                </p>
                              </div>
                              <div className="flex gap-6">
                                <div>
                                  <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest mb-1">
                                    Actor ID
                                  </p>
                                  <p className="text-xs font-mono text-neutral-400">
                                    {log.userId}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest mb-1">
                                    Platform Hash
                                  </p>
                                  <p className="text-xs font-mono text-neutral-400">
                                    SHA-256: 8f2...b4e
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                              <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Globe size={12} /> Network Context
                              </h4>
                              <div className="flex justify-between text-xs">
                                <span className="text-neutral-600">
                                  IP Address
                                </span>
                                <span className="text-neutral-400 font-mono">
                                  {log.ipAddress}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-neutral-600">
                                  Geolocation
                                </span>
                                <span className="text-neutral-400">
                                  Melbourne, AU
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-neutral-600">
                                  User Agent
                                </span>
                                <span className="text-neutral-400 truncate max-w-[200px]">
                                  Mozilla/5.0 (Windows NT 10.0...)
                                </span>
                              </div>
                              <div className="pt-2">
                                <button className="text-[10px] text-blue-400 font-bold uppercase flex items-center gap-1.5 hover:underline">
                                  View Full JSON Metadata{" "}
                                  <ExternalLink size={10} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-neutral-900/30 flex items-center justify-between border-t border-neutral-800/50">
          <p className="text-xs text-neutral-500">
            Audit Trail Integrity:{" "}
            <span className="text-emerald-400 font-bold">VERIFIED</span>
          </p>
          <div className="flex gap-2">
            <button className="btn-secondary text-xs px-4 py-1.5">
              Previous
            </button>
            <button className="btn-secondary text-xs px-4 py-1.5">
              Next Page
            </button>
          </div>
        </div>
      </div>

      {/* Security Flag Info */}
      <div className="card p-5 border-rose-500/10 bg-rose-500/5 flex items-start gap-4">
        <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
          <AlertTriangle size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-rose-400 mb-1">
            Security Alert Notifications
          </h4>
          <p className="text-xs text-neutral-500">
            Critical security events (failed logins, emergency stops) are
            automatically escalated to Patterson Cheney's SOC via Microsoft
            Sentinel integration.
          </p>
        </div>
      </div>
    </div>
  );
}
